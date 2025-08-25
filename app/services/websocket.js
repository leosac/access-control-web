import { later, run } from '@ember/runloop';
import { defer, Promise } from 'rsvp';
import Service, { service } from '@ember/service';
import { InvalidError } from '@ember-data/adapter/error';
import ENV from 'web/config/environment';

export default Service.extend({
    flashMessages: service(),
    authSrv: service('authentication'),
    ws: null,
    callback: [],
    beforeOpen: [],
    store: service(),
    isConnected: false,

    init() {
        "use strict";
        this._super(...arguments);

        // Override server address if set in local storage.
        // Used when browsing from centralized web ui.
        if (localStorage.leosacAddr) {
            ENV.APP.leosacAddr = localStorage.leosacAddr;
        }
        this.initWebsocket(ENV.APP.leosacAddr + '/websocket', null);
    },

    attemptToReconnect() {
        const self = this;
        let deferred = defer();

        deferred.promise.then(function () {
            let token = self.get('authSrv').fetchLocalAuthToken();
            if (!!token && token !== 'false') {
                self.get('authSrv').authenticateWithToken(token);
            }
        });

        this.initWebsocket(ENV.APP.leosacAddr + '/websocket', deferred);
    },

    initWebsocket: function (addr, deferred) {
        console.log('Service is initializing ...');

        let ws = this.get('ws');
        ws = new WebSocket(addr);

        let self = this;

        ws.onopen = function () {
            console.log('WS opened');

            self.set('isConnected', true);
            if (deferred) {
                deferred.resolve();
            }
            // Process item that were queued before the connection
            // was ready.
            let queue = self.get('beforeOpen');
            if (queue.length > 0) {
                queue.forEach(function (payload) {
                    ws.send(JSON.stringify(payload));
                });
                queue = [];
            }
            self.set('beforeOpen', queue);
        };

        /**
         * Called when a message is received.
         *
         * The "success" path, taken if the `status_code` is set to `0`
         * will pass the message's `content` (message specific data) to
         * the promise completion handler.
         *
         * However, when taking the "failure" path, the full message object
         * (with `status_code` and `status_string` property) is passed
         * to the rejection handler.
         */
        ws.onmessage = function (event) {
            let obj = JSON.parse(event.data);
            let cb = self.get('callback')[obj.uuid];
            // If we didn't find a callback, it means its opportunistic message
            // from server
            if (!cb) {
                if (obj.type === 'session_closed') {
                    // todo UI becomes broken after this.
                    self.flashMessages.danger('Your session has been terminated: ' +
                        obj.content.reason,
                        {
                            sticky: true,
                        });
                    self.get('authSrv')._clearAuthentication(true);
                }
            }
            else {
                if (obj.status_code === 11) {
                    /**
                     * If the error returned by the server correspond to the number eleven(11),
                     * it means that this is an generic error, not specific to one case.
                     * And to be sure that this error is intended to the front-end,
                     * we check if the pointer of the error is null.
                     *
                     * The error_code is not yet implemented,
                     * this will be useful if we want to translate the message on the web server
                     *
                     * The sticky = true method will help the person using the application to fully read the message.
                     */

                    let string = obj.content.errors[0].detail;
                    let pointer = obj.content.errors[0].source.pointer;
                    // let error_code = obj.content.errors[0].error_code;

                    if (pointer === '') {
                        self.flashMessages.danger(string, {
                            sticky: true
                        });
                    }
                    cb.error(new InvalidError(obj.content.errors));
                }
                else if (obj.status_code !== 0) {
                    self.flashMessages.danger('Error: ' + obj.status_string, {
                        sticky: true
                    });
                    cb.error(obj);
                } else {
                    cb.success(obj.content);
                }
                delete self.get('callback')[obj.uuid];
            }
        };

        ws.onclose = function (/*event*/) {
            // Flush all pending callback and mark them as error.
            const pending_callbacks = self.get('callback');

            for (let key in pending_callbacks) {
                if (!pending_callbacks.hasOwnProperty(key)) {
                    continue;
                }
                let c = pending_callbacks[key];
                c.error({
                    status_code: 6,
                    status_string: 'Connection lost',
                    content: {}
                });
            }

            // we will try to reconnect here
            let value = 0;
            let count = 0;
            let exponential = 0.0;
            let arrayValue = [];

            while (value < 200) {
                value = Math.exp(exponential);
                value = value * exponential * 100;
                arrayValue[count] = value;
                count++;
                exponential += 0.1;
            }

            self.set('isConnected', false);

            setTimeout(function () {
                self.attemptToReconnect();
            }, 5000);
        };
        this.set('ws', ws);

        let timeout_request = function () {
            const pending_callbacks = self.get('callback');

            for (let key in pending_callbacks) {
                if (!pending_callbacks.hasOwnProperty(key)) {
                    continue;
                }
                let c = pending_callbacks[key];
                let time_diff = new Date() - c.timestamp;
                if (time_diff > 10000) {
                    console.log('Timeout for request ' + key);
                    console.log(c.request);
                    delete self.get('callback')[key];

                    // We emulate a server message (at least we respect
                    // the format's specifications.
                    c.error({
                        status_code: 6,
                        status_string: 'Request Timeout',
                        content: {}
                    });
                }
            }
            later(timeout_request, 5000);
        };

        // Setup timer to check for timeout
        later(function () {
            timeout_request();
        }, 5000);

    },

    /**
     * Generate a GUID.
     *
     * @returns {string}
     */
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },

    sendJson(cmd, request_content) {
        "use strict";

        let queue = this.get('beforeOpen');
        let ws = this.get('ws');
        let callback = this.get('callback');
        let request = {
            uuid: this.guid(),
            type: cmd,
            content: request_content
        };

        if (ws.readyState === 1) {
            ws.send(JSON.stringify(request));
        }
        else {
            queue.push(request);
        }

        return new Promise(function (resolve, reject) {
            let on_success = function (data) {
                run(null, resolve, data);
            };
            let on_error = function (why) {
                run(null, reject, why);
            };
            let cb = {
                timestamp: new Date(),
                request: request, // For debugging purpose.
                success: on_success,
                error: on_error
            };
            console.log('inserting callback');
            callback[request.uuid] = cb;
        });
    }
});

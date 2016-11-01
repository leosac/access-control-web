import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'web/config/environment';

export default Ember.Service.extend({
    flashMessages: Ember.inject.service(),
    authSrv: Ember.inject.service('authentication'),
    ws: null,
    callback: [],
    beforeOpen: [],
    store: Ember.inject.service(),

    init()
    {
        "use strict";
        console.log('Service is initializing ...');

        var ws = this.get('ws');
        ws = new WebSocket('ws://' + ENV.APP.leosacAddr + '/websocket');
        var self = this;

        ws.onopen = function ()
        {
            console.log('WS opened');

            // Process item that were queued before the connection
            // was ready.
            var queue = self.get('beforeOpen');
            if (queue.length > 0)
            {
                queue.forEach(function (payload)
                {
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
        ws.onmessage = function (event)
        {
            var obj = JSON.parse(event.data);
            var cb = self.get('callback')[obj.uuid];
            // If we didn't find a callback, it means its opportunistic message
            // from server
            if (!cb)
            {
                if (obj.type === 'session_closed')
                {
                    // todo UI becomes broken after this.
                    self.get('flashMessages').danger('Your session has been terminated: ' +
                        obj.content.reason,
                        {
                            sticky: true,
                        });
                    self.get('authSrv')._clearAuthentication(true);
                }
            }
            else
            {
                if (obj.status_code === 11)
                {
                    // MODEL_EXCEPTION. We should have a "content.errors" array.
                    // We wraps the errors array in an DS.InvalidError object
                    // so that validation can automatically apply.
                    cb.error(new DS.InvalidError(obj.content.errors));
                }
                else if (obj.status_code !== 0)
                {
                    self.get('flashMessages').danger('Error: ' + obj.status_string);
                    cb.error(obj);
                }
                else
                    cb.success(obj.content);
                delete self.get('callback')[obj.uuid];
            }
        };

        ws.onclose = function (/*event*/)
        {
            self.get('flashMessages').danger('Websocket connection lost.\n' +
                'Please refresh the page.',
                {
                    sticky: true
                });

            // Flush all pending callback and mark them as error.
            const pending_callbacks = self.get('callback');
            for (var key in pending_callbacks)
            {
                if (!pending_callbacks.hasOwnProperty(key))
                    continue;
                let c = pending_callbacks[key];
                c.error({
                    status_code: 6,
                    status_string: 'Connection lost',
                    content: {}
                });
            }
        };
        this.set('ws', ws);

        var timeout_request = function ()
        {
            const pending_callbacks = self.get('callback');

            for (var key in pending_callbacks)
            {
                if (!pending_callbacks.hasOwnProperty(key))
                    continue;
                let c = pending_callbacks[key];
                var time_diff = new Date() - c.timestamp;
                if (time_diff > 10000)
                {
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
            Ember.run.later(timeout_request, 5000);
        };

        // Setup timer to check for timeout
        Ember.run.later(function ()
        {
            timeout_request();
        }, 5000);

    },

    /**
     * Generate a GUID.
     *
     * @returns {string}
     */
    guid() {
        function s4()
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },

    sendJson(cmd, request_content)
    {
        "use strict";

        var queue = this.get('beforeOpen');
        var ws = this.get('ws');
        var callback = this.get('callback');
        var request = {
            uuid: this.guid(),
            type: cmd,
            content: request_content
        };

        if (ws.readyState === 1)
        {
            ws.send(JSON.stringify(request));
        }
        else
        {
            queue.push(request);
        }

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            var on_success = function (data)
            {
                Ember.run(null, resolve, data);
            };
            var on_error = function (why)
            {
                Ember.run(null, reject, why);
            };
            var cb = {
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

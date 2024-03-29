import { computed } from '@ember/object';
import { defer } from 'rsvp';
import Service, { inject as service } from '@ember/service';

/**
 * This service provide support for authentication.
 *
 * It is used to maintain basic information about who
 * is currently logged in. It provides API to perform
 * authentication as well as manages authentication token
 * stored in the local storage.
 */
export default Service.extend({
    websocket: service('websocket'),
    store: service(),
    flashMessages: service(),

    /**
     * User Id of the currently logged in user.
     */
    user_id: false,

    /**
     * Username of the currently logged in user.
     */
    username: '',

    /**
     * Are we currently attempting to authenticate.
     */
    pending: false,

    /**
     * This a deferred object that is created when authentication starts.
     * It is resolved when authentication is performed.
     */
    current_auth: false,

    current_user: false,

    init()
    {
        "use strict";
        this._super(...arguments);
        console.log("INIT AUTH SERVICE");
        // Attempt to automatically authenticate if we can find an auth
        // token
        let token = this.fetchLocalAuthToken();
        if (!!token && token !== 'false')
        {
            this.authenticateWithToken(token);
        }
    },
    /**
     * Authenticate with username/password credential
     * @param username
     * @param password
     */
    authenticate(username, password, onSuccess, onFailure)
    {
        "use strict";
        let self = this;

        this.set('pending', true);
        this.set('current_auth', defer());

        return this.websocket.sendJson('create_auth_token',
            {
                username: username,
                password: password
            }).then(function (data)
        {
            // Authentication was successfully processed (doesn't meant it
            // succeeded.
            self.set('pending', false);
            if (data.status === 0) // success
            {
                self.store.findRecord('user', data.user_id).then((u) =>
                {
                    self.set('current_user', u);
                    // Store auth token in local storage
                    self.setLocalAuthToken(data.token);
                    self.set('user_id', data.user_id);
                    self.set('username', username);
                    self.get('current_auth').resolve();
                    self.flashMessages.success('Welcome ' + username + '.');
                    if (onSuccess) {
                        onSuccess();
                    }
                });
            }
            else
            {
                self._clearAuthentication(false);
                if (onFailure) {
                    onFailure(data.status, data.message);
                }
            }
        }, function (failure)
        {
            self._clearAuthentication(false);
            if (onFailure)
            {
                // we pass the global status here -- not too important.
                onFailure(failure.status_code, failure.status_string);
            }
        });
    },
    authenticateWithToken(token)
    {
        "use strict";
        let self = this;

        this.set('pending', true);
        this.set('current_auth', defer());

        return this.websocket.sendJson('authenticate_with_token',
            {
                token: token
            }).then(function (data)
            {
                self.set('pending', false);
                if (data.status === 0)
                {
                    self.store.findRecord('user', data.user_id).then((u) =>
                    {
                        self.set('current_user', u);
                        self.set('user_id', data.user_id);
                        self.set('username', data.username);
                        self.get('current_auth').resolve();
                    });
                }
                else
                {
                    console.log('Authentication token invalid');
                    self._clearAuthentication(true);
                }
            },
            function (/*data*/)
            {
                self._clearAuthentication(false);
                console.log('Authenticate with token failed!');
            });
    },
    /**
     * Retrieve the authentication token stored in the local storage.
     */
    fetchLocalAuthToken()
    {
        "use strict";
        if (localStorage.auth_token && localStorage.auth_token.length)
        {
            return localStorage.auth_token;
        }
        return false;
    },
    setLocalAuthToken(token)
    {
        "use strict";
        localStorage.auth_token = token;
    },
    /**
     * Returns whether or not a user is currently logged in.
     *
     * If an authentication attempt is in progress, we return
     * a promise instead. This promise will either be resolved
     * or rejected, depending on whether or not the authentication
     * attempt succeeded.
     * @returns {*}
     */
    isLoggedIn()
    {
        "use strict";
        if (!this.get('pending')) {
            return !!this.get('user_id');
        }
        return this.get('current_auth').promise;
    },
    _isLoggedIn: computed('user_id', function ()
    {
        return !!this.get('user_id');
    }),
    isAdministrator: computed('user_id', function ()
    {
        return this.store.peekRecord('user', this.get('user_id')).get('rank') === 'Administrator';
    }),
    /**
     * Log an user out.
     *
     * This destroy the stored local storage token send the
     * logout command to the server.
     *
     * It returns a promise that will be fulfilled when the
     * server acknowledge the disconnection.
     */
    logout()
    {
        "use strict";

        console.log("AUTH SERVICE LOGOUT");
        let self = this;
        localStorage.auth_token = false;
        return this.websocket.sendJson('logout', {}).then(
            () =>
            {
                self._clearAuthentication(true);
            }
        );
    },
    _clearAuthentication(deleteAuthToken)
    {
        // Clear the store from model that were loaded.
        this.store.unloadAll();
        this.set('user_id', false);
        this.set('username', '');
        if (deleteAuthToken) {
            this.setLocalAuthToken(false);
        }
        this.set('pending', false);
        this.set('current_user', false);
        this.get('current_auth').reject();
    }
});

import { tracked } from '@glimmer/tracking';
import { defer } from 'rsvp';
import Service, { service } from '@ember/service';

/**
 * This service provide support for authentication.
 *
 * It is used to maintain basic information about who
 * is currently logged in. It provides API to perform
 * authentication as well as manages authentication token
 * stored in the local storage.
 */
export default class AuthenticationService extends Service {
    @service('websocket')
    websocket;
    @service
    store;
    @service
    flashMessages;

    /**
     * User Id of the currently logged in user.
     */
    @tracked
    user_id = false;

    /**
     * Username of the currently logged in user.
     */
    @tracked
    username = '';
    /**
     * Are we currently attempting to authenticate.
     */
    @tracked
    pending = false;

    /**
     * This a deferred object that is created when authentication starts.
     * It is resolved when authentication is performed.
     */
    current_auth = false;
    current_user = false;

    constructor(owner, args) {
        super(owner, args);
        console.log("INIT AUTH SERVICE");
        // Attempt to automatically authenticate if we can find an auth
        // token
        let token = this.fetchLocalAuthToken();
        if (!!token && token !== 'false')
        {
            this.authenticateWithToken(token);
        }
    }

    /**
     * Authenticate with username/password credential
     * @param username
     * @param password
     */
    authenticate(username, password, onSuccess, onFailure)
    {
        "use strict";
        this.pending = true;
        this.current_auth = defer();

        return this.websocket.sendJson('create_auth_token',
            {
                username: username,
                password: password
            }).then((data) =>
        {
            // Authentication was successfully processed (doesn't meant it
            // succeeded.
            this.pending = false;
            if (data.status === 0) // success
            {
                this.store.findRecord('user', data.user_id).then((u) =>
                {
                    this.current_user = u;
                    // Store auth token in local storage
                    this.setLocalAuthToken(data.token);
                    this.user_id = data.user_id;
                    this.username = username;
                    this.current_auth.resolve();
                    this.flashMessages.success('Welcome ' + username + '.');
                    if (onSuccess) {
                        onSuccess();
                    }
                });
            }
            else
            {
                this._clearAuthentication(false);
                if (onFailure) {
                    onFailure(data.status, data.message);
                }
            }
        }, (failure) =>
        {
            this._clearAuthentication(false);
            if (onFailure)
            {
                // we pass the global status here -- not too important.
                onFailure(failure.status_code, failure.status_string);
            }
        });
    }

    authenticateWithToken(token)
    {
        "use strict";
        this.pending = true;
        this.current_auth = defer();

        return this.websocket.sendJson('authenticate_with_token',
            {
                token: token
            }).then((data) =>
            {
                this.pending = false;
                if (data.status === 0)
                {
                    this.store.findRecord('user', data.user_id).then((u) =>
                    {
                        this.current_user = u;
                        this.user_id = data.user_id;
                        this.username = data.username;
                        this.current_auth.resolve();
                    });
                }
                else
                {
                    console.log('Authentication token invalid');
                    this._clearAuthentication(true);
                }
            },
            (/*data*/) =>
            {
                this._clearAuthentication(false);
                console.log('Authenticate with token failed!');
            });
    }

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
    }

    setLocalAuthToken(token)
    {
        "use strict";
        localStorage.auth_token = token;
    }

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
        if (!this.pending) {
            return !!this.user_id;
        }
        return this.current_auth.promise;
    }

    get _isLoggedIn()
    {
        return !!this.user_id;
    }

    get isAdministrator()
    {
        return this.store.peekRecord('user', this.user_id).get('rank') === 'Administrator';
    }

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
    }

    _clearAuthentication(deleteAuthToken)
    {
        // Clear the store from model that were loaded.
        this.store.unloadAll();
        this.user_id = false;
        this.username = '';
        if (deleteAuthToken) {
            this.setLocalAuthToken(false);
        }
        this.pending = false;
        this.current_user = false;
        this.current_auth.reject();
    }
}

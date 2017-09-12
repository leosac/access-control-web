import Ember from 'ember';
import config from '../config/environment';
/**
 * This service store global information about the
 * Leosac we are connecting too.
 */
export default Ember.Service.extend({
    websocket: Ember.inject.service('websocket'),

    /**
     * The version number of the Leosac server.
     */
    version: "0.0.0",

    /**
     * This title of the current view.
     * Not sure this is the best way to manage this...
     */
    current_view_title: "Default",

    userLocale: 'en',

    init()
    {
        "use strict";
        this.setLocale(localStorage.user_locale || 'en');

        let self = this;
        let ws = self.get('websocket');
        ws.sendJson('get_leosac_version', {}).then(
            function (response)
            {
                self.set('version', response.version);
            },
            function (/*failure*/)
            {
                self.set('version', 'UNKNOWN');
            }
        );
    },
    setLocale(loc)
    {
        this.set('userLocale', loc);
        localStorage.user_locale = loc;
    },
    getLocale()
    {
        return this.get('userLocale');
    },

    restart()
    {
        let ws = this.get('websocket');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            console.log('Restarting the server... ');
            ws.sendJson('restart', {}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    getNameApp() {
        return config.APP.appname;
    },
    setNameApp(newName) {
        config.APP.appname = newName;
    },

    getLogoPath() {
      return config.APP.logoUrl;
    },
    setLogoPath(path) {
      config.APP.logoUrl = path;
    },

    // Server endpoint in localstorage for cloud-based deployment.
    setServerUrl(u)
    {
        localStorage.server_url = u;
    },
    getServerUrl()
    {
        return localStorage.server_url;
    }
});

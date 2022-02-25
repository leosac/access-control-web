import { Promise } from 'rsvp';
import Service, { inject as service } from '@ember/service';
import config from '../config/environment';
/**
 * This service store global information about the
 * Leosac we are connecting too.
 */
export default Service.extend({
    websocket: service('websocket'),
    modules: service('module-manager'),
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
    appNameLocal: '',

    init()
    {
        "use strict";
        //this will set the locale variable
        this.setLocale(localStorage.user_locale || 'en');
        this.setNameApp((localStorage.app_name || config.APP.appname), 1);

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
        return new Promise(function (resolve, reject)
        {
            console.log('Restarting the server... ');
            ws.sendJson('restart', {}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    setNameApp(newName, i) {
        this.set('appNameLocale', newName);
        localStorage.app_name = newName;
        // this is necessary if we ant to automatically change the name,
        // but since we don't want an infinite loop, we have to check if we are in init() or not
        if (i !== 1)
            location.reload();
    },
    getNameApp() {
        return this.get('appNameLocale');
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

import { Promise } from 'rsvp';
import { tracked } from '@glimmer/tracking';
import Service, { service } from '@ember/service';
import config from '../config/environment';
/**
 * This service store global information about the
 * Leosac we are connecting too.
 */
export default class LeosacInfoService extends Service {
    @service('websocket')
    ws;
    @service('module-manager')
    modules;

    /**
     * The version number of the Leosac server.
     */
    @tracked
    version = "0.0.0";

    /**
     * This title of the current view.
     * Not sure this is the best way to manage this...
     */
    current_view_title = "Default";
    userLocale = 'en';
    appNameLocal = '';

    constructor(owner, args) {
        super(owner, args);
        
        //this will set the locale variable
        this.setLocale(localStorage.user_locale || 'en');
        this.setNameApp((localStorage.app_name || config.APP.appname), 1);

        this.ws.sendJson('get_leosac_version', {}).then(
            (response) =>
            {
                this.version = response.version;
            },
            (/*failure*/) =>
            {
                this.version = 'UNKNOWN';
            }
        );
    }

    setLocale(loc)
    {
        this.userLocale = loc;
        localStorage.user_locale = loc;
    }

    getLocale()
    {
        return this.userLocale;
    }

    restart()
    {
        return new Promise((resolve, reject) =>
        {
            console.log('Restarting the server... ');
            this.ws.sendJson('restart', {}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    setNameApp(newName, i) {
        this.appNameLocale = newName;
        localStorage.app_name = newName;
        // this is necessary if we ant to automatically change the name,
        // but since we don't want an infinite loop, we have to check if we are in init() or not
        if (i !== 1) {
            location.reload();
        }
    }
    
    getNameApp() {
        return this.appNameLocale;
    }

    // Server endpoint in localstorage for cloud-based deployment.
    setServerUrl(u)
    {
        localStorage.server_url = u;
    }

    getServerUrl()
    {
        return localStorage.server_url;
    }
}

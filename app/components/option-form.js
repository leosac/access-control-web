import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    authSrv: service('authentication'),
    leosacInfo: service('leosac-info'),
    websocket: service('websocket'),
    store: service(),
    _title: 'settings',
    /**
     * onLogout action name.
     */
    onLogout: 'onLogout',
    languageOption: ['Français', 'English'],
    language: '',
    newName: '',

    init() {
        this._super(...arguments);
        let loc = this.get('leosacInfo').getLocale();

        this.set('newName', this.get('leosacInfo').getNameApp());
        if (loc === 'fr')
            this.set('language', 'Français');
        else
            this.set('language', 'English');
    },

    actions: {
        restart() {
            this.get('leosacInfo').restart();
        },
        logout()
        {
            "use strict";
            let self = this;
            this.get('authSrv').logout().then(() =>
            {
                self.sendAction('onLogout');
            });
        },

        getNameApp()
        {
            console.log(this.get('leosacInfo').getNameApp());
        },
        setNameApp()
        {
            this.get('leosacInfo').setNameApp(this.get('newName'));
        },

        changeLanguage(lang)
        {
            this.set('language', lang);
        },
        getLocale() {
            if (this.get('leosacInfo').getLocale() === 'fr')
                return 'Français';
            else
                return 'English';
        },
        // It help the ember-power-select component to change the value of the locale variable,
        // then refresh the page because we need to actualize the element of the page
        setLocale(loc)
        {
            if (loc === 'Français')
                this.get('leosacInfo').setLocale('fr');
            else
                this.get('leosacInfo').setLocale('en');
            location.reload();
        }
    }
});

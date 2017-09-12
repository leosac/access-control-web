import Ember from 'ember';

export default Ember.Component.extend({
    authSrv: Ember.inject.service('authentication'),
    leosacInfo: Ember.inject.service('leosac-info'),
    websocket: Ember.inject.service('websocket'),
    store: Ember.inject.service(),
    _title: 'settings',
    /**
     * onLogout action name.
     */
    onLogout: 'onLogout',
    languageOption: ['Français', 'English'],
    language: '',
    newName: null,
    init() {
        this._super(...arguments);
        let loc = this.get('leosacInfo').getLocale();
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
            let name = this.get('newName');
            this.get('leosacInfo').setNameApp(name);
        },
        getLogoPath() {
            console.log(this.get('leosacInfo').getLogoPath());
        },
        setLogoPath() {
            let path = this.get('newPath');
            this.get('leosacInfo').setLogoPath(path);
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
        // then refresh it because we need it
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

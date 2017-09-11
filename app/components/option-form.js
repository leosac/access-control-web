import Ember from 'ember';

export default Ember.Component.extend({
    authSrv: Ember.inject.service('authentication'),
    leosacInfo: Ember.inject.service('leosac-info'),
    _title: 'settings',
    /**
     * onLogout action name.
     */
    onLogout: 'onLogout',
    languageOption: ['Français', 'English'],

    actions: {
        logout()
        {
            "use strict";
            let self = this;
            this.get('authSrv').logout().then(() =>
            {
                self.sendAction('onLogout');
            });
        },
        setLocale(loc)
        {
            console.log(loc);
            if (loc === 'Français')
                this.get('leosacInfo').setLocale('fr');
            else
                this.get('leosacInfo').setLocale('en');
            location.reload();
        }
    }
});

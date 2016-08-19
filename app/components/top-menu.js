import Ember from 'ember';

export default Ember.Component.extend({
    authSrv: Ember.inject.service('authentication'),

    /**
     * onLogout action name.
     */
    onLogout: 'onLogout',

    actions: {
        logout()
        {
            "use strict";
            var self = this;
            this.get('authSrv').logout().then(() =>
            {
                self.sendAction('onLogout');
            });
        }
    }
});

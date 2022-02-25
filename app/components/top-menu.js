import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    leosacInfo: service('leosac-info'),
    authSrv: service('authentication'),

    /**
     * onLogout action name.
     */
    onLogout: 'onLogout',

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
            this.get('leosacInfo').setLocale(loc);
        }
    }
});

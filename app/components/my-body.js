import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    authSrv: service('authentication'),
    globalInfo: service('leosac-info'),
    onLogout: 'onLogout',
    actions:
    {
        /**
         * Logout event propagation. Currently
         * only the 'index' route is able to handle this event.
         */
        onLogout()
        {
            "use strict";
            console.log('LEOSAC_MY_BODY LOGOUT');
            this.sendAction('onLogout');
        }
    }
});

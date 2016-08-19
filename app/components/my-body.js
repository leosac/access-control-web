import Ember from 'ember';

export default Ember.Component.extend({
    authSrv: Ember.inject.service('authentication'),
    globalInfo: Ember.inject.service('leosac-info'),
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
            this.sendAction('onLogout');
        }
    }
});

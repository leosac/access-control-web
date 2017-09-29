import Ember from 'ember';

export default Ember.Component.extend({
    systemOverview: Ember.inject.service('system-overview'),
    moduleManager: Ember.inject.service('module-manager'),
    onSessionLost: 'onSessionLost',
    myError: 'myError',

    init()
    {
        "use strict";
        this._super();
        const self = this;
        this.get('moduleManager').init();
        this.get('systemOverview').update().catch((failure) =>
        {
            self.sendAction('myError', failure);
        });
    }
});

import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    smtpService: Ember.inject.service('module-smtp'),
    _title: 'SMTP',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return Ember.RSVP.hash({
            servers: this.get('smtpService').getServersConfig(),
        });
    },
});

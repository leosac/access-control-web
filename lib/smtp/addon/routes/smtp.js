import { set } from '@ember/object';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    smtpService: service('module-smtp'),
    _title: 'smtp.title',
    _requireAuth: true,

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return hash({
            servers: this.get('smtpService').getServersConfig(),
        });
    }
});

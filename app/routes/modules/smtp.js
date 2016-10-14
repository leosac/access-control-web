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
    actions: {
        addServer()
        {
            this.controller.model.servers.addObject({});
        },
        removeServer(srv)
        {
            this.controller.model.servers.removeObject(srv);
        },
        updateConfig()
        {
            const self = this;
            // Convert timeout to integer
            this.controller.model.servers.forEach((srv) =>
            {
                Ember.set(srv, 'timeout', Number.parseInt(srv.timeout));
            });
            this.get('smtpService').setServersConfig({servers: this.controller.model.servers}).then(() =>
                {
                    self.get('flashMessages').success('New configuration saved.');
                },
                () =>
                {
                    self.get('flashMessages').danger('Error while saving configuration.');
                });
        }
    }
});

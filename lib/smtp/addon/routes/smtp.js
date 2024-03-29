import { set } from '@ember/object';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    smtpService: service('module-smtp'),
    intl: service(),
    flashMessages: service(),
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
                set(srv, 'timeout', Number.parseInt(srv.timeout));
            });
            this.get('smtpService').setServersConfig({servers: this.controller.model.servers}).then(() =>
                {
                    self.flashMessages.success(this.intl.t('smtp.error.save_success'));
                },
                () =>
                {
                    self.flashMessages.danger(this.intl.t('smtp.error.save_error'));
                });
        }
    }
});

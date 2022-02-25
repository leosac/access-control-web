import { set } from '@ember/object';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    smtpService: service('module-smtp'),
    i18n: service(),
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
                    self.get('flashMessages').success(this.get('i18n').t('smtp.error.save_success'));
                },
                () =>
                {
                    self.get('flashMessages').danger(this.get('i18n').t('smtp.error.save_error'));
                });
        }
    }
});

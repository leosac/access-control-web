import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;
    @service
    intl;
    @service('module-smtp')
    smtpService;

    @action
    addServer() {
        this.model.servers.push({});
    }

    @action
    removeServer(srv) {
        const index = this.model.servers.indexOf(srv);
        if (index !== -1) {
            this.model.servers.splice(index, 1);
        }
    }

    @action
    updateConfig() {
        const self = this;
        // Convert timeout to integer
        this.get('model').servers.forEach((srv) =>
        {
            set(srv, 'timeout', Number.parseInt(srv.timeout));
        });
        this.smtpService.setServersConfig({servers: this.get('model').servers}).then(() =>
            {
                self.flashMessages.success(this.intl.t('smtp.error.save_success'));
            },
            () =>
            {
                self.flashMessages.danger(this.intl.t('smtp.error.save_error'));
            });
    }
}
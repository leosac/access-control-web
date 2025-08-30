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
        this.model.servers = this.model.servers;
    }

    @action
    removeServer(srv) {
        const index = this.model.servers.indexOf(srv);
        if (index !== -1) {
            this.model.servers.splice(index, 1);
            this.model.servers = this.model.servers;
        }
    }

    @action
    updateConfig() {
        // Convert timeout to integer
        this.model.servers.forEach((srv) =>
        {
            srv.timeout = Number.parseInt(srv.timeout);
        });
        this.smtpService.setServersConfig({servers: this.model.servers}).then(() =>
            {
                this.flashMessages.success(this.intl.t('smtp.error.save_success'));
            },
            () =>
            {
                this.flashMessages.danger(this.intl.t('smtp.error.save_error'));
            });
    }
}
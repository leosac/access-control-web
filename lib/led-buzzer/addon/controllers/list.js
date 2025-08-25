import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;
    @service
    intl;

    @action
    deleteLedBuzzer(config) {
        config.destroyRecord({}).then(() =>
            {
                this.router.refresh();
                this.flashMessages.success(this.intl.t('configurations.error.remove_success'));
                this.router.transitionTo('list');
            },
            () => {
                this.flashMessages.danger(this.intl.t('configurations.error.remove_error'));
            });
    }
}
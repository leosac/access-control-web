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

    @action
    editLibgpiodGpio() {
        this.get('model').save().then(() =>
        {
            this.flashMessages.success(this.intl.t('configurations.error.update_success'));
        }, () =>
        {
            this.flashMessages.danger(this.intl.t('configurations.error.update_error'));
        });
    }

    @action
    deleteLibgpiodGpio() {
        this.get('model').destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Libgpiod Gpio has been deleted.');
            this.router.transitionTo('list');
        });
    }
}
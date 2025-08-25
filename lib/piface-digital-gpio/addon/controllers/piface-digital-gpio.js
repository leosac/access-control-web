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
    editPifaceDigitalGpio() {
        this.get('model').save().then(() =>
        {
            this.flashMessages.success(this.intl.t('configurations.error.update_success'));
        }, () =>
        {
            this.flashMessages.danger(this.intl.t('configurations.error.update_error'));
        });
    }

    @action
    deletePifaceDigitalGpio() {
        this.get('model').destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Piface Digital Gpio has been deleted.');
            this.router.transitionTo('list');
        });
    }
}
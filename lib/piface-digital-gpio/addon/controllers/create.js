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
    createPifaceDigitalGpio() {
        this.model.save().then((d) => {
                this.flashMessages.success(intl.t('configurations.error.create_success'));
                this.router.transitionTo('piface-digital-gpio', d.get('id'));
            },
            () => {
                this.flashMessages.danger(intl.t('configurations.error.create_error'));
            });
    }
}
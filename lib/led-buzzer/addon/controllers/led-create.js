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
    createLed() {
        this.get('model').save().then((d) =>
            {
                this.flashMessages.success(this.intl.t('configurations.error.create_success'));
                this.router.transitionTo('led', d.get('id'));
            },
            () =>
            {
                this.flashMessages.danger(this.intl.t('configurations.error.create_error'));
            });
    }
}
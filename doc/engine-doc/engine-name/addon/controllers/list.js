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
    deleteModelName(config) {
        config.destroyRecord({}).then(() =>
            {
                // correctly deleted
                this.flashMessages.success(this.intl.t('translation.key'));
                this.router.transitionTo('list');
            },
            () => {
                // error while deleting the record
                this.flashMessages.danger(this.intl.t('translation.key'));
            });
    }
}
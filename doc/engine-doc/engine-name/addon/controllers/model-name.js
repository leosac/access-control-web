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
    editModelName() {
        this.get('model').save().then(() =>
        {
            // correctly saved
            this.flashMessages.success(this.intl.t('translation.key'));
        }, () =>
        {
            // error while saving the model
            this.flashMessages.danger(this.intl.t('translation.key'));
        });
    }

    @action
    deleteModelName() {
        this.get('model').destroyRecord({}).then(() =>
        {
            // the message is up to you, but remember that you can put a translation key, if you want.
            this.flashMessages.success('Model Name has been deleted.');
            this.router.transitionTo('list');
        });
    }
}
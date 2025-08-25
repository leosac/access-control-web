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
    createModelName() {
        this.get('model').save().then((d) =>
            {
                // you can put a flash message indicating that the model was correctly saved
                this.router.transitionTo('model-name', d.get('id'));
            },
            () =>
            {
                // not saved correctly
            });
    }
}
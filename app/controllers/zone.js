import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    editZone() {
        this.get('model').save().then(() =>
            {
                this.flashMessages.success('Zone successfully edited.');
                this.router.transitionTo('zone', this.get('model').get('id'));
            },
            () =>
            {
                this.flashMessages.danger('An error occurred while editing zone');
            });
    }

    @action
    deleteZone() {
        this.get('model').destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Zone has been deleted.');
            this.router.transitionTo('zones.list');
        });
    }
}
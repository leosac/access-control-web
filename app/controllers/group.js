import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    editGroup() {
        this.model.save().then(() =>
            {
                this.flashMessages.success('Group successfully edited.');
            },
            () =>
            {
                this.flashMessages.danger('An error occurred while editing group');
            });
    }

    @action
    deleteGroup() {
        this.model.destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Group has been deleted.');
            this.router.transitionTo('groups.list');
        });
    }
}
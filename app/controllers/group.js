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
            (error) =>
            {
                this.flashMessages.danger('An error occurred while editing group: ' + error);
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
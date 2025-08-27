import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    createGroup() {
        this.model.save().then((g) =>
            {
                this.flashMessages.success('Group created.');
                this.router.transitionTo('group', g.get('id'));
            },
            () =>
            {
                this.flashMessages.danger('Failed to create group.');
            });
    }
}
import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    createUser() {
        const u = this.get('model').user;
        const {validations} = u.validateSync();
        if (validations.get('isValid') && u.get('password') !== false)
        {
            u.save().then(() =>
                {
                    this.flashMessages.success('User successfully created.');
                    this.router.transitionTo('users.list');
                },
                () =>
                {
                    this.flashMessages.danger('Failed to create user.');
                });
        }
    }
}
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
        const {validations} = this.model.user.validateSync();
        if (validations.get('isValid') && this.model.user.get('password') !== false)
        {
            this.model.user.save().then(() =>
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

    @action
    setPassword(password) {
        this.model.user.password = password;
    }
}
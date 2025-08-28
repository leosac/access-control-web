import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    createZone() {
        this.model.save().then((d) =>
            {
                this.flashMessages.success('Zone created.');
                this.router.transitionTo('zone', d.get('id'));
            },
            (error) =>
            {
                this.flashMessages.danger('Failed to create zone: ' + error);
            });
    }
}
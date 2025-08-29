import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;
    @service
    store;

    @action
    createAP() {
        let apModel = 'leosac-builtin-access-point';
        const newAp = this.store.createRecord(apModel, {
            alias: this.model.get('alias'),
            controllerModule: this.model.get('controllerModule')
        });
        newAp.save().then((ap) =>
            {
                this.flashMessages.success('Access Point created.');
                this.router.transitionTo(apModel, ap.get('id'));
            },
            (error) =>
            {
                this.flashMessages.danger('Failed to create Access Point: ' + error);
            });
    }
}
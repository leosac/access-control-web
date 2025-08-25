import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    deleteAP(ap) {
        ap.destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Access Point has been deleted.');
            this.router.refresh();
            this.router.transitionTo('access-point.list');
        });
    }
}
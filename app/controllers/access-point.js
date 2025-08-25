import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    editAP()
    {
        this.get('model').save().then(() =>
            {
                this.flashMessages.success('Access Point successfully edited.');
                this.router.transitionTo('access-point', this.get('model').get('id'));
            },
            () =>
            {
                this.flashMessages.danger('An error occurred while editing Access Point.');
            });
    }

    @action
    deleteAP()
    {
        const self = this;
        this.get('model').destroyRecord({}).then(() =>
        {
            self.flashMessages.success('Access Point has been deleted.');
            self.router.transitionTo('access-points.list');
        });
    }
}
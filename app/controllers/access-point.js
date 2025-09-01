import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    editAP()
    {
        this.model.save().then(() =>
            {
                this.flashMessages.success('Access Point successfully edited.');
                this.router.transitionTo('access-point', this.get('model').get('id'));
            },
            (error) =>
            {
                this.flashMessages.danger('An error occurred while editing Access Point: ' + error);
            });
    }

    @action
    deleteAP()
    {
        this.model.destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Access Point has been deleted.');
            this.router.transitionTo('access-points.list');
        });
    }
}
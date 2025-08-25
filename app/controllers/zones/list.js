import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    findType(zone) {
        if (zone.type === "Logical") {
            return 1;
        } else {
            return 0;
        }
    }

    @action
    deleteZone(zone) {
        zone.destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Zone has been deleted.');
            this.router.transitionTo('zones.list');
        });
    }
}
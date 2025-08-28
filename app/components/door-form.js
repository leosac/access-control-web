import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class DoorForm extends Component {
    @service('search')
    search;

    @service
    store;

    @action
    changeAP(param) {
        if (param === null)
        {
            // Clearing AP.
            door.set('accessPoint', null);
        }
        else
        {
            this.store.findRecord('access-point', param.id).then((ap) =>
            {
                this.args.door.set('accessPoint', ap);
            });
        }
    }
}

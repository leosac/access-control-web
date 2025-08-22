import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class DeviceToggleEnabled extends Component {
    saveIt = null;

    @action
    enableDevice(device) {
        let newStatue = device.get('enabled') !== true;
        device.set('enabled', newStatue);
        if (this.get('saveIt') === true)
            device.save();
    }
}

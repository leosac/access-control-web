import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class DeviceToggleEnabled extends Component {
    @action
    enableDevice(device) {
        let newStatue = device.enabled !== true;
        device.enabled = newStatue;
        if (this.args.saveIt === true)
            device.save();
    }
}

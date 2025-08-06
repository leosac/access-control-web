import { action } from '@ember/object';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/device-toggle-enabled';

@templateLayout(layout)
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

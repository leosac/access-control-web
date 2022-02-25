import Component from '@ember/component';
import layout from '../templates/components/device-toggle-enabled';

export default Component.extend({
    layout,
    saveIt: null,
    actions: {
        enableDevice(device)
        {
            let newStatue = device.get('enabled') !== true;
            device.set('enabled', newStatue);
            if (this.get('saveIt') === true)
                device.save();
        }
    }
});

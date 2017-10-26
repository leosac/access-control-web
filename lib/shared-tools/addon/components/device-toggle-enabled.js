import Ember from 'ember';
import layout from '../templates/components/device-toggle-enabled';

export default Ember.Component.extend({
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

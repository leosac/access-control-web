import Ember from 'ember';
import layout from '../templates/components/device-toggle-enabled';

export default Ember.Component.extend({
  layout,
    actions: {
        enableDevice(device)
        {
            let newStatue = device.get('enabled') !== true;
            device.set('enabled', newStatue);
            device.save();
        }
    }
});

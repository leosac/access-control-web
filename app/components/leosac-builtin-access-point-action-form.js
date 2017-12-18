import Ember from 'ember';
import {DeviceClass} from "web/leosac-constant";

export default Ember.Component.extend({
    // Everything is a valid array right now
    arrayOfValidDevice: [
        DeviceClass.gpio,
        DeviceClass.buzzer,
        DeviceClass.led,
        DeviceClass.reader],
    deviceType: null,

    availableCommand: Ember.computed('deviceType.length', function () {
        let deviceType = this.get('deviceType');

        if (!deviceType) {
            return;
        }
        let commands = [
            'on',
            'off',
            'toggle'
        ];

        if (deviceType === ('leb' || 'buzzer')) {
            commands.push('blink');
        }
        else if (deviceType === 'wiegand-reader') {
            return [
                'beep',
                'beep_on',
                'beep_off',
                'custom'
            ];
        }
        return commands;
    }),

});

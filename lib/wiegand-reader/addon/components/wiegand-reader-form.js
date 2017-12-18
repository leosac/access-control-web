import Ember from 'ember';
import {DeviceClass} from "web/leosac-constant";

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),
    wiegandReader: false,
    newGpioHigh: null,
    newGpioLow: null,
    arrayOfDeviceClassGpio: [DeviceClass.gpio], // this is needed by the device-picker, this correspond to all the gpio
    arrayOfDeviceClassLed: [DeviceClass.led], // all LED
    arrayOfDeviceClassBuzzer: [DeviceClass.buzzer], // all Buzzer
    allGpio: [],
    allMode: ['wiegand-mode.simple',
        'wiegand-mode.pin_4',
        'wiegand-mode.pin_8',
        'wiegand-mode.pin_buffered',
        'wiegand-mode.card_4',
        'wiegand-mode.card_8',
        'wiegand-mode.card_buffered',
        'wiegand-mode.autodetect'],


    init() {
        this._super(...arguments);
    },
    actions: {
    }
});

import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { DeviceClass } from "web/leosac-constant";

export default Component.extend({
    search: service('search'),
    store: service('store'),
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

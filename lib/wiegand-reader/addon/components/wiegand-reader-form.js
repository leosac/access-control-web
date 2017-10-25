import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),
    wiegandReader: false,
    newGpioHigh: null,
    newGpioLow: null,
    arrayOfDeviceClass: [1], // this is needed by the device-class-search, this correspond to all the gpio

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

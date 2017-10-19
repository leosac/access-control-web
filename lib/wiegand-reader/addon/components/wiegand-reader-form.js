import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),

    newGpioHigh: null,
    newGpioLow: null,

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
        searchGpio(partialName) {
            let self = this;
            return this.get('search').findDeviceByAlias(partialName).then((devices) =>  {
                let object = [];
                devices.forEach(function(device) {
                    if (device['device-class'] === 1)
                        object.push(device);
                });
                this.set('allGpio', object);
                return object;
            }, (data) => {

            });
        },
        setGpioHigh(params)
        {
            console.log(this.get('wiegand-reader'));
            let object = this.get('allGpio');
            object.forEach((gpio) => {
                if (gpio.id === params.id) {
                    console.log(this.get('store').findAll('gpio'));
                    this.get('wiegand-reader').set('newGpioHigh', gpio);
                }
            });
        }
    }
    // We will have a function that will search through every device, and select only the gpio
    // and we will list them
});

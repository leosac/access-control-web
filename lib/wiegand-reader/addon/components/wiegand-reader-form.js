import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),
    wiegandReader: null,
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
        let id = this.get('wiegand-reader.id');
        //        this.get('store').find('wiegand-reader', id).then((wiegand) => {
        //          console.log(wiegand.gpioHigh);
        //    });
        // this.set('newGpioHigh', );
        // this.set('newGpioHigh', params.name);
    },
    convertServerTypeToLocalType(type) {
        if (type === 'pfdigital.gpio')
            type = 'piface-digital-gpio';
        return type;
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
                // we can sort the object here, not sure by what so its in stand-by
                return object;
            }, (data) => {

            });
        },
        setGpioHigh(params)
        {
            this.set('newGpioHigh', params.name);
            let type = this.convertServerTypeToLocalType(params.type);
            this.get('store').find(type, params.id).then((gpio) => {
                this.get('wiegand-reader').set('gpioHigh', gpio);
            });
         },
        setGpioLow(params)
        {
            this.set('newGpioLow', params.name);
            let type = this.convertServerTypeToLocalType(params.type);
            this.get('store').find(type, params.id).then((gpio) => {
                this.get('wiegand-reader').set('gpioLow', gpio);

            });
        }
    }
    // We will have a function that will search through every device, and select only the gpio
    // and we will list them
});

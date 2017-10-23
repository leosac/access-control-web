import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),
    wiegandReader: false,
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
    convertServerTypeToLocalType(type) {
        if (type === 'pfdigital.gpio')
            type = 'piface-digital-gpio';
        return type;
    },
    actions: {
        searchGpio(partialName) {
            return this.get('search').findDeviceByAlias(partialName).then((devices) =>  {
                let object = [];
                devices.forEach(function(device) {
                    if (device['device-class'] === 1)
                        object.push(device);
                });
                this.set('allGpio', object);
                // we can sort the object here, not sure by what so it is in stand-by
                return object;
            }, (data) => {

            });
        },
        setGpioHigh(params)
        {
            let type = this.convertServerTypeToLocalType(params.type);
            this.get('store').find(type, params.id).then((gpio) => {
                this.get('wiegand-reader').set('gpioHigh', gpio);
            });
        },
        setGpioLow(params)
        {
            let type = this.convertServerTypeToLocalType(params.type);
            this.get('store').find(type, params.id).then((gpio) => {
                this.get('wiegand-reader').set('gpioLow', gpio);
            });
        },
        enableWiegand(params) {
            console.log(params);
            if (params === true)
                this.get('wiegand-reader').set('enabled', false);
            else
                this.set('wiegand-reader.enabled', true);
        }
    }
});

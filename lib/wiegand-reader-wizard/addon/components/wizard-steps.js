import Ember from 'ember';
import layout from '../templates/components/wizard-steps';

function checkName(configName) {
    if (configName === null)
        return 'Name must be filled';

    if (configName.length > 40)
        return 'Name length too long';
    if (/\s/g.test(configName))
        return 'Name must not contain space';
}

export default Ember.Component.extend({
    store: Ember.inject.service(),
    i18n: Ember.inject.service(),
    leosacInfo: Ember.inject.service('leosac-info'),

    appName: 'LOLOLOL',
    steps: {},
    listOfGpio: ['piface-digital-gpio'],
    gpioType: 'piface-digital-gpio',
    ledEnabled: false,
    buzzerEnabled: false,
    configName: null,
    gpios: {
        high: null,
        low: null,
        led: null,
        buzzer: null
    },
    pifaceDigitalGpioLed: null,
    pifaceDigitalGpioBuzzer: null,
    pifaceDigitalGpioHigh: null,
    pifaceDigitalGpioLow: null,
    buzzer: null,
    led: null,
    wiegandReader: null,


    init() {
        this._super(...arguments);

        let steps = [
            {
                value: 'a',
                name: 'step A',
                description: 'First step'
            },
            {
                value: 'b',
                name: 'step B',
                description: 'Second step'
            },
            {
                value: 'c',
                name: 'step C',
                description: 'Third step'
            },
            {
                value: 'd',
                name: 'step D',
                description: 'Forth step'
            }
        ];
        this.set('steps', steps);
    },
    /**
     * This will fill a gpio after that it was created
     * @param gpio
     * @param name
     * @param direction
     */
    fillGpio(gpio, name, direction) {
        gpio.set('name', (this.get('configName') + '-gpio-' + name).toUpperCase());
        gpio.set('enabled', true);
        gpio.set('hardwareAddress', 0);
        gpio.set('direction', direction);
        gpio.set('defaultValue', false);
    },
    createGpios(gpioType) {
        this.set('pifaceDigitalGpioHigh', this.get('store').createRecord(gpioType));
        this.fillGpio(this.get('pifaceDigitalGpioHigh'), 'high', 'in');

        this.set('pifaceDigitalGpioLow', this.get('store').createRecord(gpioType));
        this.fillGpio(this.get('pifaceDigitalGpioLow'), 'low', 'in');

        if (this.get('ledEnabled')) {
            this.set('pifaceDigitalGpioLed', this.get('store').createRecord(gpioType));
            this.fillGpio(this.get('pifaceDigitalGpioLed'), 'led', 'out');
        }

        if (this.get('buzzerEnabled')) {
            this.set('pifaceDigitalGpioBuzzer', this.get('store').createRecord(gpioType));
            this.fillGpio(this.get('pifaceDigitalGpioBuzzer'), 'buzzer', 'out');
        }
    },
    /**
     * This will fill a ledBuzzer after it was created
     * @param device
     * @param type
     */
    fillLedBuzzer(device, type) {
        device.set('name', (this.get('configName') + '-' + type).toUpperCase());
        device.set('enabled', true);
        device.set('defaultBlinkDuration', 3000);
        device.set('defaultBlinkSpeed', 1000);
        device.set('gpio', this.get('pifaceDigitalGpio' + type));
    },
    createLed() {
        this.set('led', this.get('store').createRecord('led', {
            name: (this.get('configName') + '-led').toUpperCase(),
            enabled: true,
            defaultBlinkDuration: 3000,
            defaultBlinkSpeed: 1000,
            gpio: this.get('pifaceDigitalGpioLed')
        }));
    },
    createBuzzer() {
        this.set('buzzer', this.get('store').createRecord('buzzer'));
        this.fillLedBuzzer(this.get('buzzer'), 'Buzzer');
    },


    fillWiegandReader(reader) {
        reader.set('name', this.get('configName').toUpperCase());
        reader.set('enabled', true);
        reader.set('mode', 'wiegand-mode.simple');
        reader.set('gpioHigh', this.get('pifaceDigitalGpioHigh'));
        reader.set('gpioLow', this.get('pifaceDigitalGpioLow'));
        if (this.get('ledEnabled'))
            reader.set('greenLed', this.get('led'));
        if (this.get('buzzerEnabled'))
            reader.set('buzzer', this.get('buzzer'));
    },
    createWiegandReader() {
        this.set('wiegandReader', this.get('store').createRecord('wiegand-reader'));
        this.fillWiegandReader(this.get('wiegandReader'));
    },

    checkGpioNumber() {
        let allNumber = [];

        let def = Ember.RSVP.defer();

        if (!this.get('pifaceDigitalGpioHigh').get('validations.isTruelyValid'))
            def.reject('Error with Number GPIO High');

        if (!this.get('pifaceDigitalGpioLow').get('validations.isTruelyValid'))
            def.reject('Error with Number GPIO Low');

        if (this.get('ledEnabled'))
            if (!this.get('pifaceDigitalGpioLed').get('validations.isTruelyValid'))
                def.reject('Error with Number GPIO LED');

        if (this.get('buzzerEnabled'))
            if (!this.get('pifaceDigitalGpioBuzzer').get('validations.isTruelyValid'))
                def.reject('Error with Number GPIO Buzzer');

        /**
         * This will enumerate through every gpio
         * If a gpio is enabled, it will keep its value in an array.
         * This array will be used to check if there is no duplicate.
         */
        this.get('store').findAll(this.get('gpioType'), {reload: true}).then((allGpios) => {
            /**
             * Verification if duplicate within the previous gpio
             */
            // let configName = this.get('configName').toUpperCase();
            // allGpios.forEach((gpio) => {
            //     if (!gpio.get('name').includes(configName)) {
            //         if (gpio.get('enabled') === true)
            //             allNumber.push(gpio.get('number'));
            //     }
            // });
            if (allNumber.indexOf(Number.parseInt(this.get('pifaceDigitalGpioHigh').get('number'))) !== -1) {
                def.reject('Duplicate number for the GPIO High');
            }
            else
                allNumber.push(Number.parseInt(this.get('pifaceDigitalGpioHigh').get('number')));

            if (allNumber.indexOf(Number.parseInt(this.get('pifaceDigitalGpioLow').get('number'))) !== -1) {
                def.reject('Duplicate number for the GPIO Low');
            }
            else
                allNumber.push(Number.parseInt(this.get('pifaceDigitalGpioLow').get('number')));

            if (this.get('ledEnabled')) {
                if (allNumber.indexOf(Number.parseInt(this.get('pifaceDigitalGpioLed').get('number'))) !== -1) {
                    def.reject('Duplicate number for the GPIO LED');
                }
                else
                    allNumber.push(Number.parseInt(this.get('pifaceDigitalGpioLed').get('number')));
            }

            if (this.get('buzzerEnabled')) {
                if (allNumber.indexOf(Number.parseInt(this.get('pifaceDigitalGpioBuzzer').get('number'))) !== -1) {
                    def.reject('Duplicate number for the GPIO Buzzer');
                }
                else
                    allNumber.push(Number.parseInt(this.get('pifaceDigitalGpioBuzzer').get('number')));
            }

            def.resolve(true);
        });

        return def.promise;
    },
    saveGpio() {
        let def = Ember.RSVP.defer();

        this.get('pifaceDigitalGpioHigh').save().then(() => {
        }, () => {
            def.reject('Error saving Piface Digital Gpio High');
        });
        this.get('pifaceDigitalGpioLow').save().then(() => {
        }, () => {
            def.reject('Error saving Piface Digital Gpio Low');
        });

        if (this.get('ledEnabled'))
            this.get('pifaceDigitalGpioLed').save().then(() => {
            }, () => {
                def.reject('Error saving Piface Digital Gpio LED');
            });
        if (this.get('buzzerEnabled'))
            this.get('pifaceDigitalGpioBuzzer').save().then(() => {
            }, () => {
                def.reject('Error saving Piface Digital Gpio Buzzer');
            });
        def.resolve(true);
        return def.promise;
    },
    actions: {
        /**
         * This will check if everything is alright before moving on the next step of our wizard
         * @param transition
         * @returns {boolean}
         */
        transitionFromAToB(transition) {
            let errorMsg = checkName(this.get('configName'));
            if (errorMsg) {
                this.get('flashMessages').danger(errorMsg);
            }
            else
                transition();
        },
        transitionFromBToC(transition) {
            this.checkGpioNumber().then(() => transition(),
                (err) => {
                    this.get('flashMessages').danger(err);
                });
        },
        /**
         * This will do something before going on the next step of our wizard
         * @param value {value, from, to}
         * @returns {boolean}
         */
        afterTransition(value) {
            if (value.from === 'a' && value.to === 'b') {
                this.createGpios(this.get('gpioType'));
                // if (this.get('ledEnabled'))
                //     this.createLed();
                // if (this.get('buzzerEnabled'))
                //     this.createBuzzer();
            }
            if (value.from === 'b' && value.to === 'c') {
//                this.createWiegandReader();
            }
            return true;
        },
        /**
         * This will restart the server,
         * but before we have to save our new model, which are :
         * - 2 gpio (+1 for led and buzzer)
         * - (optional) the led and/or the buzzer
         * - the wiegand reader
         */
        restart() {
            this.saveGpio().then(() => {
                // console.log(this.get('pifaceDigitalGpioLed'));
                if (this.get('ledEnabled')) {

                    this.set('led', this.get('store').createRecord('led', {
                        name: (this.get('configName') + '-led').toUpperCase(),
                        enabled: true,
                        defaultBlinkDuration: 3000,
                        defaultBlinkSpeed: 1000,
                        gpio: this.get('pifaceDigitalGpioLed')
                    }));

                    window.setTimeout(() => {
                        this.get('led').save();
                    }, 2000);

//                    this.createLed();
                    //  console.log(this.get('led').get('gpio'));
                    //     this.get('led').save().then(() => {
                    //
                    //         console.log(this.get('pifaceDigitalGpioLed'));
                    //         console.log(this.get('led').get('gpio'));
                    //
                    //         this.createWiegandReader();
                    //         this.get('wiegandReader').save().then(() => {
                    //             this.get('flashMessages').success('Correctly configured the Wiegand Reader');
                    //             //                this.get('leosacInfo').restart();
                    //         }, () => {
                    //             this.get('flashMessages').danger('Error saving the wiegand Reader');
                    //         });
                    //     }, () => {
                    //         this.get('flashMessages').danger('Error saving Buzzer');
                    //     });
                    // }
                }


                // if (this.get('buzzerEnabled'))
                //     this.createBuzzer();
                //
                //
                // if (this.get('buzzerEnabled')) {
                //     this.get('buzzer').save().then(() => {
                //     }, () => {
                //         this.get('flashMessages').danger('Error saving Buzzer');
                //     });
                // }

                // }, (err) => {
                //     this.get('flashMessages').danger(err);
                // });
            });
        }
    }
})
;

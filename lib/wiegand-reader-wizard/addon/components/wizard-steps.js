import { defer } from 'rsvp';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { validator, buildValidations } from 'ember-cp-validations';


const configNameValidation = buildValidations({
    configName: [
        validator('presence', true),
        validator('length',
            {
                min: 3,
                max: 20
            }),
        validator('format', {
            regex: /^\S*$/
        })
    ],
});


export default Component.extend(configNameValidation, {
    store: service(),
    leosacInfo: service('leosac-info'),
    intl: service(),
    flashMessages: service(),
    steps: {},
    listOfGpio: ['piface-digital-gpio'],
    gpioType: 'piface-digital-gpio',
    hardwareAddressList: ['0', '1', '2', '3'],
    hardwareAddress: '0',
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
                value: 'general',
                name: 'Step 1',
                description: 'General configuration'
            },
            {
                value: 'gpio',
                name: 'Step B',
                description: 'GPIOs configuration'
            },
            {
                value: 'finish',
                name: 'Step C',
                description: 'Finish Page'
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
        gpio.set('hardwareAddress', Number.parseInt(this.get('hardwareAddress')));
        gpio.set('direction', direction);
        gpio.set('defaultValue', false);
    },
    createGpios(gpioType) {
        this.set('pifaceDigitalGpioHigh', this.store.createRecord(gpioType));
        this.fillGpio(this.get('pifaceDigitalGpioHigh'), 'high', 'in');

        this.set('pifaceDigitalGpioLow', this.store.createRecord(gpioType));
        this.fillGpio(this.get('pifaceDigitalGpioLow'), 'low', 'in');

        if (this.get('ledEnabled')) {
            this.set('pifaceDigitalGpioLed', this.store.createRecord(gpioType));
            this.fillGpio(this.get('pifaceDigitalGpioLed'), 'led', 'out');
        }

        if (this.get('buzzerEnabled')) {
            this.set('pifaceDigitalGpioBuzzer', this.store.createRecord(gpioType));
            this.fillGpio(this.get('pifaceDigitalGpioBuzzer'), 'buzzer', 'out');
        }
    },

    /**
     * This will fill a ledBuzzer after it was created
     * @param device
     * @param gpio
     * @param type
     */
    fillLedBuzzer(device, gpio, type) {
        device.set('name', (this.get('configName') + '-' + type).toUpperCase());
        device.set('enabled', true);
        device.set('defaultBlinkDuration', 3000);
        device.set('defaultBlinkSpeed', 1000);
        device.set('gpio', gpio);
    },
    createLed() {
        this.set('led', this.store.createRecord('led'));
        this.fillLedBuzzer(this.get('led'), this.get('pifaceDigitalGpioLed'), 'led');
    },
    createBuzzer() {
        this.set('buzzer', this.store.createRecord('buzzer'));
        this.fillLedBuzzer(this.get('buzzer'), this.get('pifaceDigitalGpioBuzzer'), 'buzzer');
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
        this.set('wiegandReader', this.store.createRecord('wiegand-reader'));
        this.fillWiegandReader(this.get('wiegandReader'));
    },

    checkGpioNumber() {
        let allNumber = [];

        let def = defer();

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
         * This will enumerate through every GPIO
         * If a GPIO is enabled, it will keep its value in an array.
         * This array will be used to check if there is no duplicate.
         */
        this.store.findAll(this.get('gpioType'), {reload: true}).then((allGpios) => {
            /**
             * Verification if duplicate within the previous gpio
             */
            let configName = this.get('configName').toUpperCase();
            allGpios.forEach((gpio) => {
                if (!gpio.get('name').includes(configName)) {
                    if (gpio.get('enabled') === true)
                        allNumber.push(gpio.get('number'));
                }
            });
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
        let def = defer();

        this.get('pifaceDigitalGpioHigh').save().then(() => {
            this.get('pifaceDigitalGpioLow').save().then(() => {
                /**
                 * If there is a led and a buzzer
                 */
                if (this.get('ledEnabled') && this.get('buzzerEnabled')) {
                    this.get('pifaceDigitalGpioLed').save().then(() => {
                        this.get('pifaceDigitalGpioBuzzer').save().then(() => {
                            def.resolve(true);
                        }, () => {
                            def.reject('Error saving Piface Digital Gpio Buzzer');
                        });
                    }, () => {
                        def.reject('Error saving Piface Digital Gpio LED');
                    });
                }
                /**
                 * If there is no led and buzzer
                 */
                else if (!this.get('ledEnabled') && !this.get('buzzerEnabled')) {
                    def.resolve(true);
                }
                /**
                 * If there is a led or a buzzer
                 */
                else {
                    if (this.get('ledEnabled')) {
                        this.get('pifaceDigitalGpioLed').save().then(() => {
                            def.resolve(true);
                        }, () => {
                            def.reject('Error saving Piface Digital Gpio LED');
                        });
                    }
                    else if (this.get('buzzerEnabled')) {
                        this.get('pifaceDigitalGpioBuzzer').save().then(() => {
                            def.resolve(true);
                        }, () => {
                            def.reject('Error saving Piface Digital Gpio Buzzer');
                        });
                    }
                }
            }, () => {
                def.reject('Error saving Piface Digital Gpio Low');
            });
        }, () => {
            def.reject('Error saving Piface Digital Gpio High');
        });

        return def.promise;
    },
    createAndSaveLedBuzzer() {
        let def = defer();

        /**
         * If there is a led and a buzzer,
         * create the led, save it, then create the buzzer ,save it
         * and quit the function thanks to resolve
         */
        if (this.get('ledEnabled') && this.get('buzzerEnabled')) {
            this.createLed();
            this.get('led').save().then(() => {

                this.createBuzzer();
                this.get('buzzer').save().then(() => {
                    def.resolve(true);
                }, () => {
                    def.reject('Error saving Buzzer');
                });
            }, () => {
                def.reject('Error saving LED');
            });
        }
        /**
         * if there is no led and buzzer, quit the function
         */
        else if (!this.get('ledEnabled') && !this.get('buzzerEnabled')) {
            def.resolve(true);
        }
        /**
         * if there is a led or a buzzer,
         * create and save it, then resolve
         */
        else {
            if (this.get('ledEnabled')) {
                this.createLed();
                this.get('led').save().then(() => {
                    def.resolve(true);
                }, () => {
                    def.reject('Error saving LED');
                });
            }
            else {
                this.createBuzzer();
                this.get('buzzer').save().then(() => {
                    def.resolve(true);
                }, () => {
                    def.reject('Error saving Buzzer');
                });
            }
        }

        return def.promise;
    },
    /**
     * This will restart the server,
     * but before we have to save our new model, which are :
     * - 2 gpio (+1 for each led and buzzer)
     * - the led and/or the buzzer
     * - the wiegand reader
     */
    /**
     * This function is the last function of our wizard, it is basically:
     * 1. Save the previously created GPIOs, then
     * 2. Create and save the led and/or buzzer, then
     * 3. Create and save the wiegand-reader, then
     * 4. Restart the server to activate the new wiegand-reader
     */
    saveWiegandReader() {
        return this.saveGpio().then(() => {
            this.createAndSaveLedBuzzer().then(() => {
                this.createWiegandReader();
                this.get('wiegandReader').save().then(() => {

                    this.flashMessages.success('Correctly configured the Wiegand Reader');
                    this.leosacInfo.restart();
                    return true;
                }, () => {
                    this.flashMessages.danger('Error saving the Wiegand Reader');
                    return false;
                });
            }, (err) => {
                this.flashMessages.danger(err);
                return false;
            });
        }, (err) => {
            this.flashMessages.danger(err);
            return false;
        });
    },
    actions: {
        /**
         * This will check if everything is alright before moving on the next step of our wizard
         * @param transition
         * @returns {boolean}
         */
        transitionFromGeneralToGpio(transition) {
            this.validate().then(({ validations}) => {
                if (validations.get('isValid'))
                    transition();
            });
        },
        transitionFromGpioToFinish(transition) {
            this.checkGpioNumber().then(() => transition(),
                (err) => {
                    this.flashMessages.danger(err);
                });
        },
        /**
         * This will do something before going on the next step of our wizard
         * @param value {value, from, to}
         * @returns {boolean}
         */
        afterTransition(value) {
            if (value.from === 'general' && value.to === 'gpio') {
                this.createGpios(this.get('gpioType'));
            }
            if (value.from === 'gpio' && value.to === 'finish') {
                if (this.saveWiegandReader() === false)
                    return false;
            }
            return true;
        }
    }
});

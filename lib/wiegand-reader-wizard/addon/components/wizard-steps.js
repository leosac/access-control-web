import { action } from '@ember/object';
import { service } from '@ember/service';
import { defer } from 'rsvp';
import Component from '@glimmer/component';

/*const configNameValidation = buildValidations({
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
});*/

export default class WizardSteps extends Component {
    @service
    store;
    @service('leosac-info')
    leosacInfo;
    @service
    intl;
    @service
    flashMessages;

    gpioType = 'piface-digital-gpio';
    hardwareAddress = '0';
    ledEnabled = false;
    buzzerEnabled = false;
    configName = null;
    pifaceDigitalGpioLed = null;
    pifaceDigitalGpioBuzzer = null;
    pifaceDigitalGpioHigh = null;
    pifaceDigitalGpioLow = null;
    buzzer = null;
    led = null;
    wiegandReader = null;
    currentTab = 0;

    constructor(owner, args) {
        super(owner, args);
        this.listOfGpio = this.listOfGpio || ['piface-digital-gpio'];
        this.hardwareAddressList = this.hardwareAddressList || ['0', '1', '2', '3'];
        this.gpios = this.gpios || {
            high: null,
            low: null,
            led: null,
            buzzer: null
        };
    }

    /**
     * This will fill a gpio after that it was created
     * @param gpio
     * @param name
     * @param direction
     */
    fillGpio(gpio, name, direction) {
        gpio.set('name', (this.gconfigName + '-gpio-' + name).toUpperCase());
        gpio.set('enabled', true);
        gpio.set('hardwareAddress', Number.parseInt(this.hardwareAddress));
        gpio.set('direction', direction);
        gpio.set('defaultValue', false);
    }

    createGpios(gpioType) {
        this.pifaceDigitalGpioHigh = this.store.createRecord(gpioType);
        this.fillGpio(this.pifaceDigitalGpioHigh, 'high', 'in');

        this.pifaceDigitalGpioLow = this.store.createRecord(gpioType);
        this.fillGpio(this.pifaceDigitalGpioLow, 'low', 'in');

        if (this.ledEnabled) {
            this.pifaceDigitalGpioLed = this.store.createRecord(gpioType);
            this.fillGpio(pifaceDigitalGpioLed, 'led', 'out');
        }

        if (this.buzzerEnabled) {
            this.pifaceDigitalGpioBuzzer = this.store.createRecord(gpioType);
            this.fillGpio(pifaceDigitalGpioBuzzer, 'buzzer', 'out');
        }
    }

    /**
     * This will fill a ledBuzzer after it was created
     * @param device
     * @param gpio
     * @param type
     */
    fillLedBuzzer(device, gpio, type) {
        device.set('name', (this.configName + '-' + type).toUpperCase());
        device.set('enabled', true);
        device.set('defaultBlinkDuration', 3000);
        device.set('defaultBlinkSpeed', 1000);
        device.set('gpio', gpio);
    }

    createLed() {
        this.led = this.store.createRecord('led');
        this.fillLedBuzzer(this.led, this.pifaceDigitalGpioLed, 'led');
    }

    createBuzzer() {
        this.buzzer = this.store.createRecord('buzzer');
        this.fillLedBuzzer(this.buzzer, this.pifaceDigitalGpioBuzzer, 'buzzer');
    }

    fillWiegandReader(reader) {
        reader.set('name', this.configName.toUpperCase());
        reader.set('enabled', true);
        reader.set('mode', 'wiegand-mode.simple');
        reader.set('gpioHigh', this.pifaceDigitalGpioHigh);
        reader.set('gpioLow', this.pifaceDigitalGpioLow);
        if (this.ledEnabled)
            reader.set('greenLed', this.led);
        if (this.buzzerEnabled)
            reader.set('buzzer', this.buzzer);
    }

    createWiegandReader() {
        this.wiegandReader = this.store.createRecord('wiegand-reader');
        this.fillWiegandReader(this.wiegandReader);
    }

    checkGpioNumber() {
        let allNumber = [];

        let def = defer();

        if (!this.pifaceDigitalGpioHigh.get('validations.isTruelyValid'))
            def.reject('Error with Number GPIO High');

        if (!this.pifaceDigitalGpioLow.get('validations.isTruelyValid'))
            def.reject('Error with Number GPIO Low');

        if (this.ledEnabled)
            if (!this.pifaceDigitalGpioLed.get('validations.isTruelyValid'))
                def.reject('Error with Number GPIO LED');

        if (this.buzzerEnabled)
            if (!this.pifaceDigitalGpioBuzzer.get('validations.isTruelyValid'))
                def.reject('Error with Number GPIO Buzzer');

        /**
         * This will enumerate through every GPIO
         * If a GPIO is enabled, it will keep its value in an array.
         * This array will be used to check if there is no duplicate.
         */
        this.store.findAll(this.gpioType, {reload: true}).then((allGpios) => {
            /**
             * Verification if duplicate within the previous gpio
             */
            let configName = this.configName.toUpperCase();
            allGpios.forEach((gpio) => {
                if (!gpio.get('name').includes(configName)) {
                    if (gpio.get('enabled') === true)
                        allNumber.push(gpio.get('number'));
                }
            });
            if (allNumber.indexOf(Number.parseInt(this.pifaceDigitalGpioHigh.get('number'))) !== -1) {
                def.reject('Duplicate number for the GPIO High');
            }
            else
                allNumber.push(Number.parseInt(this.pifaceDigitalGpioHigh.get('number')));

            if (allNumber.indexOf(Number.parseInt(this.pifaceDigitalGpioLow.get('number'))) !== -1) {
                def.reject('Duplicate number for the GPIO Low');
            }
            else
                allNumber.push(Number.parseInt(this.pifaceDigitalGpioLow.get('number')));

            if (this.ledEnabled) {
                if (allNumber.indexOf(Number.parseInt(this.pifaceDigitalGpioLed.get('number'))) !== -1) {
                    def.reject('Duplicate number for the GPIO LED');
                }
                else
                    allNumber.push(Number.parseInt(this.pifaceDigitalGpioLed.get('number')));
            }

            if (this.buzzerEnabled) {
                if (allNumber.indexOf(Number.parseInt(this.pifaceDigitalGpioBuzzer.get('number'))) !== -1) {
                    def.reject('Duplicate number for the GPIO Buzzer');
                }
                else
                    allNumber.push(Number.parseInt(this.pifaceDigitalGpioBuzzer.get('number')));
            }

            def.resolve(true);
        });

        return def.promise;
    }

    saveGpio() {
        let def = defer();

        this.pifaceDigitalGpioHigh.save().then(() => {
            this.pifaceDigitalGpioLow.save().then(() => {
                /**
                 * If there is a led and a buzzer
                 */
                if (this.ledEnabled && this.buzzerEnabled) {
                    this.pifaceDigitalGpioLed.save().then(() => {
                        this.pifaceDigitalGpioBuzzer.save().then(() => {
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
                else if (!this.ledEnabled && !this.buzzerEnabled) {
                    def.resolve(true);
                }
                /**
                 * If there is a led or a buzzer
                 */
                else {
                    if (this.ledEnabled) {
                        this.pifaceDigitalGpioLed.save().then(() => {
                            def.resolve(true);
                        }, () => {
                            def.reject('Error saving Piface Digital Gpio LED');
                        });
                    }
                    else if (this.buzzerEnabled) {
                        this.pifaceDigitalGpioBuzzer.save().then(() => {
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
    }

    createAndSaveLedBuzzer() {
        let def = defer();

        /**
         * If there is a led and a buzzer,
         * create the led, save it, then create the buzzer ,save it
         * and quit the function thanks to resolve
         */
        if (this.ledEnabled && this.buzzerEnabled) {
            this.createLed();
            this.led.save().then(() => {
                this.createBuzzer();
                this.buzzer.save().then(() => {
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
        else if (!this.ledEnabled && !this.buzzerEnabled) {
            def.resolve(true);
        }
        /**
         * if there is a led or a buzzer,
         * create and save it, then resolve
         */
        else {
            if (this.ledEnabled) {
                this.createLed();
                this.led.save().then(() => {
                    def.resolve(true);
                }, () => {
                    def.reject('Error saving LED');
                });
            }
            else {
                this.createBuzzer();
                this.buzzer.save().then(() => {
                    def.resolve(true);
                }, () => {
                    def.reject('Error saving Buzzer');
                });
            }
        }

        return def.promise;
    }

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
                this.wiegandReader.save().then(() => {

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
    }

    /**
     * This will check if everything is alright before moving on the next step of our wizard
     * @param transition
     * @returns {boolean}
     */
    @action
    transitionFromGeneralToGpio() {
        this.validate().then(({ validations}) => {
            if (validations.get('isValid'))
                this.createGpios(this.gpioType);
        });
    }

    @action
    transitionFromGpioToFinish() {
        this.checkGpioNumber().then(() => this.saveWiegandReader(),
            (err) => {
                this.flashMessages.danger(err);
            });
    }

    @action
    transitionToHome() {

    }
}

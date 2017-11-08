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

    appName: 'LOLOLOL',
    steps: {},
    listOfGpio: ['piface-digital-gpio'],
    gpioType: 'piface-digital-gpio',
    numberOfGpioNeeded: 2,
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
    errorDuplicate: -1,

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
    createLed() {
        this.set('led', this.get('store').createRecord('led'));
        this.fillLedBuzzer(this.get('led'), 'Led');
    },
    createBuzzer() {
        this.set('buzzer', this.get('store').createRecord('buzzer'));
        this.fillLedBuzzer(this.get('buzzer'), 'Buzzer');
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

        this.get('store').findAll(this.get('gpioType'), {reload: true}).then((allGpios) => {

            let configName = this.get('configName').toUpperCase();
            let i = 0;
            allGpios.forEach((gpio) => {
                if (!gpio.get('name').includes(configName)) {
                    console.log(i++);
                    console.log(gpio);
                    allNumber.push(gpio.get('number'));
                }
            });

            console.log(allNumber);

            if (allNumber.indexOf(this.get('pifaceDigitalGpioHigh').get('number')) !== -1) {
                def.reject('Duplicate number for the GPIO High');
            }
            else
                allNumber.push(this.get('pifaceDigitalGpioHigh').get('number'));

            if (allNumber.indexOf(this.get('pifaceDigitalGpioLow').get('number')) !== -1) {
                def.reject('Duplicate number for the GPIO Low');
            }
            else
                allNumber.push(this.get('pifaceDigitalGpioLow').get('number'));

            if (this.get('ledEnabled')) {
                if (allNumber.indexOf(this.get('pifaceDigitalGpioLed').get('number')) !== -1) {
                    def.reject('Duplicate number for the GPIO LED');
                }
                else
                    allNumber.push(this.get('pifaceDigitalGpioLed').get('number'));
            }

            if (this.get('buzzerEnabled')) {
                if (allNumber.indexOf(this.get('pifaceDigitalGpioBuzzer').get('number')) !== -1) {
                    def.reject('Duplicate number for the GPIO Buzzer');
                }
                else
                    allNumber.push(this.get('pifaceDigitalGpioBuzzer').get('number'));
            }

            def.resolve(true);
        });

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
                if (this.get('ledEnabled'))
                    this.createLed();
                if (this.get('buzzerEnabled'))
                    this.createBuzzer();
            }
            return true;
        }
    }
});

import Ember from 'ember';
import layout from '../templates/components/wizard-steps';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    i18n: Ember.inject.service(),

    appName: 'LOLOLOL',
    steps: {},
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
    led: null,
    buzzer: null,
    high: null,
    low: null,

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
    actions: {
        /**
         * This will check if everything is alright before moving on the next step of our wizard
         * @param value {value, from, to}
         * @returns {boolean}
         */
        beforeTransition(value) {
            let configName = this.get('configName');
            if (value.from === 'a' && value.to === 'b') {
                if (configName === null || configName.length <= 5 || configName.length > 40) {
                    this.get('flashMessages').danger('Invalid Name. (too small, too long, or not filled in)');
                    return false;
                }
            }
            return true;
        }
    }
});

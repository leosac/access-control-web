import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const paramsValidation = buildValidations({
    duration: [
        validator('presence', true),
        validator('number', {
            allowString: true,
            positive: true,
            integer: true
        })
    ],
    speed: [
        validator('presence', true),
        validator('number', {
            allowString: true,
            positive: true,
            integer: true
        })
    ],

});

export default Ember.Component.extend(paramsValidation, {
    duration: 3000,
    speed: 1500,

    init() {
        let params = this.get('customAction.params');

        if (!!params) {
            this.set('duration', parseInt(params[0]));
            this.set('speed', parseInt(params[1]));
        }
        this._super(...arguments);
    },

    params: Ember.computed('{speed,duration}', function() {
        let speed = this.get('speed');
        let duration = this.get('duration');

        this.set('customAction.params', [duration,speed]);
    })
});

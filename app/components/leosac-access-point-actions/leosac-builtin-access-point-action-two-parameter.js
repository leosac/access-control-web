import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { validator, buildValidations } from 'ember-cp-validations';

/**
 * This is a custom validator for the duration and the speed,
 * we ensure that this value are positive integer number
 */
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

/**
 * You need to provide customAction to that component.
 * customAction is normally autoprovided by the leosac-builtin-access-point-action-params
 *
 */
export default class LeosacBuiltinAccessPointActionTwoParameter extends Component.extend(paramsValidation) {
    duration = 3000;
    speed = 1500;
    customAction = null;

    // This will set the value of speed and duration if we can fetch this value
    constructor(owner, args) {
        super(owner, args);
        let params = this.get('customAction.params');

        if (!!params) {
            this.set('duration', parseInt(params[0]));
            this.set('speed', parseInt(params[1]));
        }
    }

    // The sole purpose of this computed property is to catch when a value is modified so that you can update the mode.
    // Not very beautiful hack
    @computed('{speed,duration}')
    get params() {
        let speed = this.get('speed');
        let duration = this.get('duration');

        this.set('customAction.params', [duration,speed]);
    }
}

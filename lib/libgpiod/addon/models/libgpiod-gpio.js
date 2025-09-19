import Gpio from 'web/models/gpio';
import { attr } from '@ember-data/model';
import { validator , buildValidations } from 'ember-cp-validations';


const Validations = buildValidations(
    {
        hardwareAddress: [
            validator('presence', {
                presence: true
            })
        ]
    }
);

export default class LibgpiodGpioModel extends Gpio.extend(Validations) {
    @attr('string')
    device;
    @attr('number', {defaultValue: 0})
    offset;
    @attr('interruptMode', {defaultValue: 'none'})
    interruptMode;
}

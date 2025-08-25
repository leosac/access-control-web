import Gpio from 'web/models/gpio';
import { attr } from '@ember-data/model';
import { validator , buildValidations } from 'ember-cp-validations';


const Validations = buildValidations(
    {
        hardwareAddress: [
            validator('presence', {
                presence: true
            }),
            validator('number', {
                allowString: true,
                integer: true,
                positive: true,
                gte: 0,
                lte: 3
            })
        ]
    }
);

export default class PifaceDigitalGpioModel extends Gpio.extend(Validations) {
    @attr('number', {defaultValue: 0})
    hardwareAddress;
}

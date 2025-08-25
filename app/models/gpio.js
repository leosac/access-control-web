import { attr } from '@ember-data/model';
import Device from 'web/models/device';
import { validator , buildValidations } from 'ember-cp-validations';

const Validations = buildValidations(
    {
        number: [
            validator('presence', {
                presence: true
            }),
            validator('number', {
                allowString: true,
                integer: true,
                positive: true,
                gte: 0,
                lte: 7
            })
        ],
        direction: [
            validator('presence', true)
        ]
    }
);

export default class GpioModel extends Device.extend(Validations) {
    @attr('number')
    number;
    @attr('direction', {defaultValue: 'in'})
    direction;
    @attr('boolean')
    defaultValue;
}

import DS from 'ember-data';
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

export default Device.extend(Validations, {
    number: DS.attr('number'),
    direction: DS.attr('direction', {defaultValue: 'in'}),
    defaultValue: DS.attr('default-value')
});

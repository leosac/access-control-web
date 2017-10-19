import Ember from 'ember';
import Gpio from 'web/models/gpio';
import DS from 'ember-data';
import { validator , buildValidations } from 'ember-cp-validations';
import Model from 'ember-data/model';


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

export default Gpio.extend(Validations, {
    hardwareAddress: DS.attr('number', {defaultValue: 0})
});

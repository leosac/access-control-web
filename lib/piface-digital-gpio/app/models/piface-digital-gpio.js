import Ember from 'ember';
import DS from 'ember-data';
import { validator , buildValidations } from 'ember-cp-validations';
import Model from 'ember-data/model';

const Validations = buildValidations(
    {
        name:[
            validator('presence', true),
            validator('ds-error'),
            validator('length', {
                min: 3,
                max: 15,
            })
        ],
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

export default DS.Model.extend(Validations, {
    name: DS.attr('string'),
    number: DS.attr('number'),
    direction: DS.attr('direction'),
    defaultValue: DS.attr('defaultValue'),
});

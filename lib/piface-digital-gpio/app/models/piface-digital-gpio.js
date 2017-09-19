import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';
import Model from 'ember-data/model';

const pifaceValidations = buildValidations(
    {
        alias:[
            validator('presence', true),
            validator('ds-error'),
            validator('length', {
                min: 3,
                max: 15
            })
        ],
        no: {
            validators:
                [
                    validator('presence', true),
                    validator('number', {
                        allowString: true,
                        integer: true,
                        positive: true,
                        gte: 0,
                        lte: 7
                    })
                ]
        },
        direction:[
            validator('presence', true)
        ]
    }
);

export default Model.extend(pifaceValidations, {
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),
    name: DS.attr('string'),
    no: DS.attr('number'),
    direction: DS.attr('direction')
});

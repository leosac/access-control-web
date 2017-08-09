import Model from 'ember-data/model';
import DS from 'ember-data';
import Ember from 'ember';
import {validator, buildValidations} from 'ember-cp-validations';

const ZoneValidations = buildValidations(
    {
        alias: [
            validator('presence', true),
            validator('ds-error'),
            validator('length',
                {
                    min: 3,
                    max: 15
                })
        ],
        type: [
            validator('presence', true),
            validator('number',
                {
                    gte: 0,
                    lte: 1
                })
        ]

    }
);

export default DS.Model.extend(ZoneValidations, {
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),
    alias: DS.attr('string'),
    description: DS.attr('string'),
    type: DS.attr('number'),
    // doors: DS.hasMany('door'),
    parents: DS.belongsTo('zones'),
    children: DS.hasMany('zones', {inverse: 'parents'})
});

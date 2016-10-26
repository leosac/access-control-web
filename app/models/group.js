import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const GroupValidations = buildValidations(
    {
        name: [validator('presence', true),
            validator('ds-error'),
            validator('length', {
                min: 3,
                max: 50,
            })
        ]
    }
);

export default Model.extend(GroupValidations, {
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),
    memberCount: Ember.computed('memberships', function ()
    {
        return this.get('memberships.length');
    }),
    name: DS.attr('string'),
    description: DS.attr('string'),
    memberships: DS.hasMany('user-group-membership', {
        inverse: 'group'
    }),
    // This is a fake relationship, because server side it
    // does'nt exist directly.
    schedules: DS.hasMany('schedules'),
});

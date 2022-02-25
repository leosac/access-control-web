import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const UserValidations = buildValidations(
    {
        username: validator('presence', true),
        firstname:  validator('presence', true),
        lastname:  validator('presence', true),
        email: [
            validator('presence', true),
            validator('format', { type: 'email' })
        ],
    }
);

export default Model.extend(UserValidations, {
    numericId: computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),
    username: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    rank: DS.attr('user-rank'),
    memberships: DS.hasMany('user-group-membership', {
        inverse: 'user'
    }),
    credentials: DS.hasMany('credential', {
        inverse: 'owner',
        polymorphic: true,
    }),

    // This is a fake relationship, because server side it
    // does'nt exist directly.
    schedules: DS.hasMany('schedules'),
    // Validity information
    validityEnabled: DS.attr('boolean'),
    validityStart: DS.attr('utc'),
    validityEnd: DS.attr('utc'),

    // The ODB version.
    version: DS.attr('number')
});

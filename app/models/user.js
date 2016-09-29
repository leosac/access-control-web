import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const UserValidations = buildValidations(
    {
        username: validator('presence',
            {
                presence: true,
                message: 'You must pick an username'
            }),
        firstname:  validator('presence',
            {
                isWarning: true,
                presence: true,
                message: "Firstname shouldn't be blank."
            }),
        lastname:  validator('presence',
            {
                isWarning: true,
                presence: true,
                message: "Lastname shouldn't be blank."
            }),
        email: [
            validator('presence', true),
            validator('format', { type: 'email' })
        ],
    }
);

export default Model.extend(UserValidations, {
    numericId: Ember.computed('id', function ()
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
        polymorphic: true
    }),
    validityEnabled: DS.attr('boolean'),
    // The ODB version.
    version: DS.attr('number')
});

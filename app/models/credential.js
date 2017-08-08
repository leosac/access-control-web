import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';
import moment from 'moment';

const CredentialValidations = buildValidations(
    {
        alias:
            {
                validators:
                    [
                        validator('ds-error'),
                        validator('presence', true),
                        validator('length', {
                            min: 3,
                            max: 15
                        })
                    ]
             },
             description:
                 {
                     validators:
                     [
                         validator('length',
                             {
                                 min: 5
                             })
                     ]
                 }

    }
);

export default DS.Model.extend(CredentialValidations, {
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),
    isEnabled: Ember.computed('validityEnabled', 'validityStart', 'validityEnd', function ()
    {
        const now = moment.utc();
        return this.get('validityEnabled') && now.isAfter(this.get('validityStart')) &&
                now.isBefore(this.get('validityEnd'));
    }),

    alias: DS.attr('string'),
    description: DS.attr('string'),
    owner: DS.belongsTo('user'),

    // Validity information
    validityEnabled: DS.attr('boolean'),
    validityStart: DS.attr('utc'),
    validityEnd: DS.attr('utc'),

    // The ODB version.
    version: DS.attr('number'),

    // Quick info about a credential. For a card this would be the card
    // id. This doesn't come from the server.
    displayIdentifier: 'N/A',
    // This is a fake relationship, because server side it
    // does'nt exist directly.
    schedules: DS.hasMany('schedules'),
});

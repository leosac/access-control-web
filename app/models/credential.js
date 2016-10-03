import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const CredentialValidations = buildValidations(
    {
        alias: validator('ds-error')
    }
);

export default DS.Model.extend(CredentialValidations, {
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),
    alias: DS.attr('string'),
    description: DS.attr('string'),
    owner: DS.belongsTo('user'),

    // Quick info about a credential. For a card this would be the card
    // id.
    displayIdentifier: 'N/A'
});

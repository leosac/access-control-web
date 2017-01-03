import Credential from 'web/models/credential';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const RFIDCardValidations = buildValidations(
    {
        cardId: validator('ds-error'),
        nbBits: validator('number', {
            allowString: true,
            integer: true,
            positive: true,
            gt: 0
        })
    }
);

export default Credential.extend(RFIDCardValidations, {
    // Hardcoded to true to distinguish between credential type.
    isRFIDCard: true,
    type: 'RFIDCard',
    cardId: DS.attr('string'),
    nbBits: DS.attr('number'),

    displayIdentifier: Ember.computed.alias('cardId'),
});

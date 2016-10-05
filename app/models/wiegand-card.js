import Credential from 'web/models/credential';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const WiegandCardValidations = buildValidations(
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

export default Credential.extend(WiegandCardValidations, {
    // Hardcoded to true to distinguish between credential type.
    isWiegandCard: true,
    type: 'WiegandCard',
    cardId: DS.attr('string'),
    nbBits: DS.attr('number'),

    displayIdentifier: Ember.computed.alias('cardId'),
});

import Credential from 'web/models/credential';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const RFIDCardValidations = buildValidations(
    {
        cardId: {
           validators: [
               validator('ds-error'),
               validator('presence', true),
               validator('length', {
                   // 10 here is n number of bytes, it can be changed,
                   // if you want only a sequences like that: 00:00:00:00, just change 10 by 4
                   max: 10 * 3 - 1
               }),
             validator('format', {
                 // language=JSRegexp
                 // regex for the rfid card number, a sequence of number in hexadecimal (16^n) separated by the ':' character
                 regex: /([0-9a-fA-F][0-9a-fA-F]:)*[0-9a-fA-F][0-9a-fA-F]/
             })
           ]
        },
        nbBits:
            {
                validators:
                    [
                        validator('presence', true),
                        validator('number', {
                            allowString: true,
                            integer: true,
                            positive: true,
                            //gt: 0
                    })
                ]
            }
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

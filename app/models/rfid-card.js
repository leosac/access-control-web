import Credential from 'web/models/credential';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';
import credential from "./credential";

// function catchNbrBits(nbBits)
// {
//     return catchNbrBits(credential.extend(RFIDCardValidations).nbBits);
// }
//
// console.log("test " + catchNbrBits(credential.extend(RFIDCardValidations).nbBits));

// myComputed: computed(function() {
//     return  ((Ember.computed.reads('model.nbBits') / 8) * 3 - 1);
// });

const RFIDCardValidations = buildValidations(
    {
        nbBits:
            {
                validators:
                    [
                        validator('presence', true),
                        validator('number', {
                            allowString: true,
                            integer: true,
                            positive: true
                        })
                    ]
            },
        cardId: {
            validators: [
                validator('ds-error'),
                validator('presence', true),
                validator('length', {
                    // 10 here is n number of bytes, it can be changed,
                    // if you want only a sequences like that: 00:00:00:00, just change 10 by 4
                    //(Ember.computed.not('model.nbBits') / 8) * 3 - 1
                    max: 11
                        //computed.reads('model.myComputed')
                }),
                validator('format', {
                    // language=JSRegexp
                    // regex for the rfid card number, a sequence of number in hexadecimal (16^n) separated by the ':' character
                    regex: /[0-9A-F]{2}(?::[0-9A-F]{2})*/i
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

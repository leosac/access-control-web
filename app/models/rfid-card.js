import { alias, readOnly } from '@ember/object/computed';
import Credential from 'web/models/credential';
import { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

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
                    is: readOnly('model.cardIdExpectedLength')
                }),
                validator('format', {
                    // language=JSRegexp
                    // regex for the rfid card number, a sequence of number in hexadecimal (8 * 2 ^ ( number of hexadecimal double)) separated by the ':' character
                    regex: /^[0-9A-F]{2}(?::[0-9A-F]{2})*$/i,
                    messageKey: 'credentials.rfid_card.error'
//                    message : "Invalid format, should be a sequence of two hexadecimal number(0-9A-F), separated by colon(:). Exampe: '0A:2b:8E:9f'"
                })
            ]
        }
    }
);

export default class RfidCardModel extends Credential.extend(RFIDCardValidations) {
    // Hardcoded to true to distinguish between credential type.
    isRFIDCard = true;
    type = 'RFIDCard';
    @attr('string')
    cardId;
    @attr('number')
    nbBits;

    get cardIdExpectedLength() {
        const sizeCode = parseInt(this.nbBits);
        return (Math.ceil((sizeCode / 8)) * 3 - 1);
    }

    @alias('cardId')
    displayIdentifier;
}

import { alias } from '@ember/object/computed';
import Credential from 'web/models/credential';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const PinCodeValidations = buildValidations(
    {
        code:
            {
                validators:
                    [
                        validator('ds-error'),
                        validator('number', {
                            allowString: true,
                            integer: true,
                            gte: 0,
                            lte: 9999999999
                        }),
                        // This is not a 'valid' length, this is just a pre-identifier
                        validator('length', {
                            min: 4,
                            max: 8
                        })
                    ]
            }
    }
);

export default Credential.extend(PinCodeValidations, {
    // Hardcoded to true to distinguish between credential type.
    isPinCode: true,
    type: 'PinCode',
    code: DS.attr('string'),
    displayIdentifier: alias('code')
});

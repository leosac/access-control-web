import Credential from 'web/models/credential';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

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
                        validator('length', {
                            min: 4,
                            max: 10
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
    displayIdentifier: Ember.computed.alias('code'),
});

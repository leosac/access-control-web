import Credential from 'web/models/credential';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const PinCodeValidations = buildValidations(
    {
        code: validator('ds-error')
    }
);

export default Credential.extend(PinCodeValidations, {
    // Hardcoded to true to distinguish between credential type.
    isPinCode: true,
    type: 'PinCode',
    code: DS.attr('string'),
    displayIdentifier: Ember.computed.alias('code'),
});

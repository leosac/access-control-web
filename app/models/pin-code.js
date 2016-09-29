import Credential from 'web/models/credential';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

export default Credential.extend({
    // Hardcoded to true to distinguish between credential type.
    isPinCode: true,
    type: 'PinCode',
    code: DS.attr('string'),
});

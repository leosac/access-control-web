import Credential from 'web/models/credential';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

export default Credential.extend({
    cardId: DS.attr('string'),
    nbBits: DS.attr('number'),
});

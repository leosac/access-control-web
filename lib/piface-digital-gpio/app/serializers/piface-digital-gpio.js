import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
     modelNameFromPayloadKey(payloadType) {
         payloadType = 'piface-digital-gpio';
         return payloadType;
    }
});

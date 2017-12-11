import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
     modelNameFromPayloadKey(payloadType) {
         payloadType = 'piface-digital-gpio';
         return payloadType;
    }
});

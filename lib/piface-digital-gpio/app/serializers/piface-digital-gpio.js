import DS from 'ember-data';

// This will change the payload name
export default DS.JSONAPISerializer.extend({
     modelNameFromPayloadKey(payloadType) {
         payloadType = 'piface-digital-gpio';
         return payloadType;
    }
});

 import JSONAPISerializer from '@ember-data/serializer/json-api';

// This will change the payload name
export default JSONAPISerializer.extend({
     modelNameFromPayloadKey(payloadType) {
         payloadType = 'piface-digital-gpio';
         return payloadType;
    }
});

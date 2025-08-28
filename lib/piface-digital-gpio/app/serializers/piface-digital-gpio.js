 import JSONAPISerializer from '@ember-data/serializer/json-api';

// This will change the payload name
export default class extends JSONAPISerializer {
     modelNameFromPayloadKey(payloadType) {
         payloadType = 'piface-digital-gpio';
         return payloadType;
    }
}

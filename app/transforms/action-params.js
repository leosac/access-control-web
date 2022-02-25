import { typeOf } from '@ember/utils';
import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize: function (serialized) {
        return (typeOf(serialized) === "array") ? serialized : [];
    },

    serialize: function (deserialized) {
        let type = typeOf(deserialized);
        if (type === 'array') {
            return deserialized;
        }
        else if (type === 'string') {
            return [deserialized];
        }
        else {
            return [];
        }
    }
});

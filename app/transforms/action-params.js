import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
    deserialize: function (serialized) {
        return (Ember.typeOf(serialized) === "array") ? serialized : [];
    },

    serialize: function (deserialized) {
        let type = Ember.typeOf(deserialized);
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

import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 0)
            return 'unknown';
        else if (serialized === 1)
            return 'gpio';
        else if (serialized === 2)
            return 'reader';
    },

    serialize(deserialized) {
        if (deserialized === 'unknown')
            return 0;
        else if (deserialized === 'gpio')
            return 1;
        else if (deserialized === 'reader')
            return 2;
    }
});

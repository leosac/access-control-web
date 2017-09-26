import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 0)
            return 'in';
        else if (serialized === 1)
            return 'out';
    },

    serialize(deserialized) {
        if (deserialized === 'in')
            return 0;
        else if (deserialized === 'out')
            return 1;
    }
});

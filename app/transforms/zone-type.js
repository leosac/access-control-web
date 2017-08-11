import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 1)
            return 'Logical';
        else if (serialized === 0)
            return 'Physical';
    },

    serialize(deserialized) {
        if (deserialized === 'Logical')
            return 1;
        else if (deserialized === 'Physical')
            return 0;
    }
});

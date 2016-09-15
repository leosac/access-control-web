import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 1)
            return 'Administrator';
        else if (serialized === 0)
            return 'Normal';
    },

    serialize(deserialized) {
        if (deserialized === 'Administrator')
            return 1;
        else if (deserialized === 'Normal')
            return 0;
    }
});

import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 2)
            return 'administrator';
        else if (serialized === 1)
            return 'operator';
        else if (serialized === 0)
            return 'member';
    },

    serialize(deserialized) {
        if (deserialized === 'administrator')
            return 2;
        else if (deserialized === 'operator')
            return 1;
        else if (deserialized === 'member')
            return 0;
    }
});

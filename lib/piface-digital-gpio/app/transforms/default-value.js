import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === false)
            return 'false';
        else if (serialized === true)
            return 'true';
    },

    serialize(deserialized) {
        if (deserialized === 'true')
            return true;
        else if (deserialized === 'false')
            return false;
    }
});

import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 0)
            return 'unknown';
        else if (serialized === 1)
            return 'gpio';
        else if (serialized === 2)
            return 'reader';
        else if (serialized === 3)
            return 'led';
        else if (serialized === 4)
            return 'buzzer';
    },

    serialize(deserialized) {
        if (deserialized === 'unknown')
            return 0;
        else if (deserialized === 'gpio')
            return 1;
        else if (deserialized === 'reader')
            return 2;
        else if (deserialized === 'led')
            return 3;
        else if (deserialized === 'buzzer')
            return 4;
    }
});

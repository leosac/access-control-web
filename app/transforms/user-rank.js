import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 4)
            return 'Administrator';
        else if (serialized === 3)
            return 'Supervisor';
        else if (serialized === 2)
            return 'Manager';
        else if (serialized === 1)
            return 'Viewer';
        else if (serialized === 0)
            return 'User';
    },

    serialize(deserialized) {
        if (deserialized === 'Administrator')
            return 4;
        else if (deserialized === 'Supervisor')
            return 3;
        else if (deserialized === 'Manager')
            return 2;
        else if (deserialized === 'Viewer')
            return 1;
        else if (deserialized === 'User')
            return 0;
    }
});

import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 1) {
            return 'zone.type.logical';
        } else if (serialized === 0) {
            return 'zone.type.physical';
        }
    },

    serialize(deserialized) {
        if (deserialized === 'zone.type.logical') {
            return 1;
        } else if (deserialized === 'zone.type.physical') {
            return 0;
        }
    }
});

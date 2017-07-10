import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        return new Date(serialized * 1000);
    },

    serialize(deserialized) {
        console.log('Hopefully we never get there');
        return deserialized;
    }
});

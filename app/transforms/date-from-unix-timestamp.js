import Transform from 'ember-data/transform';

export default Transform.extend({
    deserialize(serialized) {
        return new Date(serialized * 1000);
    },

    serialize(deserialized) {
        console.log('Hopefully we never get there');
        return deserialized;
    }
});

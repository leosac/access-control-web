import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        return new Date(serialized * 1000);
    },

    /**
     * We must not get there other than the group membership
     * @param deserialized
     * @returns {*}
     */
    serialize(deserialized) {
        return deserialized;
    }
});

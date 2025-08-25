export default class DataFromUnixTimestampTransform {
    deserialize(serialized, options) {
        return new Date(serialized * 1000);
    }

    /**
     * We must not get there other than the group membership
     * @param deserialized
     * @returns {*}
     */
    serialize(deserialized, options) {
        return deserialized;
    }

    static create() {
        return new this();
    }
}

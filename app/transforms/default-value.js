export default class DefaultValueTransform {
    deserialize(serialized, options) {
        if (serialized === false) {
            return 'false';
        } else if (serialized === true) {
            return 'true';
        }
    }

    serialize(deserialized, options) {
        if (deserialized === 'true') {
            return true;
        } else if (deserialized === 'false') {
            return false;
        }
    }

    static create() {
        return new this();
    }
}

export default class DirectionTransform {
    deserialize(serialized, options) {
        if (serialized === 0) {
            return 'in';
        } else if (serialized === 1) {
            return 'out';
        }
    }

    serialize(deserialized, options) {
        if (deserialized === 'in') {
            return 0;
        } else if (deserialized === 'out') {
            return 1;
        }
    }

    static create() {
        return new this();
    }
}

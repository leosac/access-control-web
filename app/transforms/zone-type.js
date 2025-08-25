export default class ZoneTypeTransform {
    deserialize(serialized, options) {
        if (serialized === 1) {
            return 'zone.type.logical';
        } else if (serialized === 0) {
            return 'zone.type.physical';
        }
    }

    serialize(deserialized, options) {
        if (deserialized === 'zone.type.logical') {
            return 1;
        } else if (deserialized === 'zone.type.physical') {
            return 0;
        }
    }

    static create() {
        return new this();
    }
}

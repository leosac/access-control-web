export default class UserRankTransform {
    deserialize(serialized, options) {
        if (serialized === 4) {
            return 'administrator';
        } else if (serialized === 3) {
            return 'supervisor';
        } else if (serialized === 2) {
            return 'manager';
        } else if (serialized === 1) {
            return 'viewer';
        } else if (serialized === 0) {
            return 'user';
        }
    }

    serialize(deserialized, options) {
        if (deserialized === 'administrator') {
            return 4;
        } else if (deserialized === 'supervisor') {
            return 3;
        } else if (deserialized === 'manager') {
            return 2;
        } else if (deserialized === 'viewer') {
            return 1;
        } else if (deserialized === 'user') {
            return 0;
        }
    }

    static create() {
        return new this();
    }
}

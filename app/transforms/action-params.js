import { typeOf } from '@ember/utils';

export default class ActionParamsTransform {
    deserialize(serialized, options) {
        return (typeOf(serialized) === "array") ? serialized : [];
    }

    serialize(deserialized, options) {
        let type = typeOf(deserialized);
        if (type === 'array') {
            return deserialized;
        }
        else if (type === 'string') {
            return [deserialized];
        }
        else {
            return [];
        }
    }

    static create() {
        return new this();
    }
}

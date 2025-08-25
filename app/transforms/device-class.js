import { DeviceClass } from 'web/leosac-constant';

export default class DeviceClassTransform {
    deserialize(serialized, options) {
        const types = [];

        for (let key in DeviceClass)
        {
            if (DeviceClass.hasOwnProperty(key))
            {
                if (DeviceClass[key] && serialized) {
                    types.push(key);
                }
            }
        }
        return types.join(',');
    }

    serialize(deserialized, options) {
        return deserialized;
    }

    static create() {
        return new this();
    }
}

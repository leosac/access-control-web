import DS from 'ember-data';
import { DeviceClass } from 'web/leosac-constant';

export default DS.Transform.extend({
    deserialize(serialized) {
        const types = [];

        for (let key in DeviceClass)
        {
            if (DeviceClass.hasOwnProperty(key))
            {
                if (DeviceClass[key] && serialized)
                    types.push(key);
            }
        }
        return types.join(',');
    },

    serialize(deserialized) {
        return deserialized;
    }
});

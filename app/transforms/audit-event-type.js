import DS from 'ember-data';
import { AuditEventType } from 'web/leosac-constant';

export default DS.Transform.extend({
    /**
     * We receive an integer. We must output a string.
     */
    deserialize(serialized) {
        const types = [];

        for (let key in AuditEventType)
        {
            if (AuditEventType.hasOwnProperty(key))
            {
                if (AuditEventType[key] & serialized) {
                    types.push(key);
                }
            }
        }
        return types.join(',');
    },

    serialize(deserialized) {
        return deserialized;
    }
});

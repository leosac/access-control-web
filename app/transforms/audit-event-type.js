import Transform from 'ember-data/transform';
import {AuditEventType} from 'web/leosac-constant';

export default Transform.extend({
    /**
     * We receive an integer. We must output a string.
     */
    deserialize(serialized) {
        const types = [];

        for (var key in AuditEventType)
        {
            if (AuditEventType.hasOwnProperty(key))
            {
                if (AuditEventType[key] & serialized)
                    types.push(key);
            }
        }
        return types.join(',');
    },

    serialize(deserialized) {
        return deserialized;
    }
});

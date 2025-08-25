import { AuditEventType } from 'web/leosac-constant';

export default class AuditEventTypeTransform {
    /**
     * We receive an integer. We must output a string.
     */
    deserialize(serialized, options) {
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
    }

    serialize(deserialized, options) {
        return deserialized;
    }

    static create() {
        return new this();
    }
}

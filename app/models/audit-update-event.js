import AuditEntry from 'web/models/audit-entry';
import { belongsTo } from '@ember-data/model';

export default class AuditUpdateEvent extends AuditEntry {
    type = 'UpdateEvent';
    @belongsTo('update', { async: true, inverse: null })
    target;
}

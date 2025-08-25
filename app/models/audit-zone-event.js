import AuditEntry from 'web/models/audit-entry';
import { belongsTo } from '@ember-data/model';

export default class AuditZoneEvent extends AuditEntry {
    type = 'ZoneEvent';
    @belongsTo('zone')
    target;
}

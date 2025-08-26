import AuditEntry from 'web/models/audit-entry';
import { attr, belongsTo } from '@ember-data/model';

export default class AuditDoorEventModel extends AuditEntry {
    type = 'DoorEvent';
    @belongsTo('door', { async: true, inverse: null })
    target;
    @attr('string')
    before;
    @attr('string')
    after;
}

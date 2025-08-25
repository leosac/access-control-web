import AuditEntry from 'web/models/audit-entry';
import { attr, belongsTo } from '@ember-data/model';

export default class AuditScheduleEvent extends AuditEntry {
    type = 'ScheduleEvent';
    @belongsTo('schedule')
    target;
    @attr('string')
    before;
    @attr('string')
    after;
}

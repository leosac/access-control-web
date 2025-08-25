import AuditEntry from 'web/models/audit-entry';
import { attr, belongsTo } from '@ember-data/model';

export default class AuditUserEvent extends AuditEntry {
    type = 'UserEvent';
    @belongsTo('user')
    target;
    @attr('string')
    before;
    @attr('string')
    after;
}

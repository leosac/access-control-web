import AuditEntry from 'web/models/audit-entry';
import { attr, belongsTo } from '@ember-data/model';

export default class AuditGroupEvent extends AuditEntry {
    type = 'GroupEvent';
    @belongsTo('group', { async: true, inverse: null })
    target;
    @attr('string')
    before;
    @attr('string')
    after;
}

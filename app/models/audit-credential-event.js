import AuditEntry from 'web/models/audit-entry';
import { attr, belongsTo } from '@ember-data/model';

export default class AuditCredentialEventModel extends AuditEntry {
    type = 'CredentialEvent';
    @belongsTo('credential')
    target;
    @attr('string')
    before;
    @attr('string')
    after;
}

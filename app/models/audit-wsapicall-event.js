import AuditEntry from 'web/models/audit-entry';
import { attr } from '@ember-data/model';

export default class AuditWSAPICallModel extends AuditEntry {
    type = 'WSAPICall';
    @attr('string')
    uuid;
    @attr('string')
    method;
    @attr('string')
    description;
}

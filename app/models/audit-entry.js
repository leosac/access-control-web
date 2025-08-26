import Model, { attr, belongsTo } from '@ember-data/model';

export default class AuditEntryModel extends Model {
    get numericId() {
        return Number(this.get('id'));
    }

    @belongsTo('user', { async: true, inverse: null })
    author;
    // todo mb convert to 'utc' and store as a std::timepoint
    // server side
    @attr('date-from-unix-timestamp')
    timestamp;
    @attr('audit-event-type')
    eventMask;
    @attr('string')
    description;
    @attr('boolean')
    finalized;
}

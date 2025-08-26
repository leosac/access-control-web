import Model, { attr } from '@ember-data/model';

export default class LogMessageModel extends Model {
    get numericId() {
        return Number(this.get('id'));
    }

    @attr
    message;
    @attr('date-from-unix-timestamp')
    timestamp;
}

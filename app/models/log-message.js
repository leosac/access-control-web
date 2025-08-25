import { computed } from '@ember/object';
import Model, { attr } from '@ember-data/model';

export default class LogMessageModel extends Model {
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @attr
    message;
    @attr('date-from-unix-timestamp')
    timestamp;
}

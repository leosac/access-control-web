import { computed } from '@ember/object';
import { service } from '@ember/service';
import Model, { attr } from '@ember-data/model';


export default class UpdateModel extends Model {
    @service
    intl;

    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @computed('status')
    statusString() {
        const st = this.get('status');
        if (st === 0) {
            return this.intl.t('pending');
        } else if (st === 1) {
            return this.intl.t('acknowledged');
        } else if (st === 2) {
            return this.intl.t('cancelled');
        }
    }

    @attr('number')
    status;
    @attr('number')
    checkpoint;

    @attr('utc')
    generatedAt;
    @attr('utc')
    statusUpdatedAt;
    @attr('string')
    sourceModule;
    @attr('string')
    description;
}

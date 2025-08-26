import { service } from '@ember/service';
import Model, { attr } from '@ember-data/model';


export default class UpdateModel extends Model {
    @service
    intl;

    get numericId() {
        return Number(this.get('id'));
    }

    get statusString() {
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

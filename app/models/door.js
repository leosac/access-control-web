import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const DoorValidations = buildValidations({
    alias: validator('presence', true)
});


export default class DoorModel extends Model.extend(DoorValidations) {
    get numericId() {
        return Number(this.get('id'));
    }

    @attr('string')
    alias;
    @attr('string')
    description;
    @belongsTo('access-point', { async: true, inverse: 'door' })
    accessPoint;
}

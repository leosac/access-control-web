import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const AccesPointValidations = buildValidations({
    alias: validator('presence', true)
});

export default class AccessPointModel extends Model.extend(AccesPointValidations) {
    get numericId() {
        return Number(this.get('id'));
    }

    @attr('string')
    alias;
    @attr('string')
    description;
    @attr('string')
    controllerModule;
    @belongsTo('door', { async: true, inverse: null })
    door;
}

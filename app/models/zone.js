import Model, { attr, hasMany } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const ZoneValidations = buildValidations(
    {
        alias: [
            validator('presence', true),
            validator('ds-error'),
            validator('length',
                {
                    min: 3,
                    max: 30
                })
        ]
    }
);

export default class ZoneModel extends Model.extend(ZoneValidations) {
    get numericId() {
        return Number(this.get('id'));
    }
    @attr('string')
    alias;
    @attr('string')
    description;
    @attr('zone-type')
    type;
    @hasMany('door', { async: true, inverse: null })
    doors;
    @hasMany('zone', { async: true, inverse: 'parent' })
    children;
    @hasMany('zone', { async: true, inverse: 'children' })
    parent;
}

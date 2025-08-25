import { computed } from '@ember/object';
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
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }
    @attr('string')
    alias;
    @attr('string')
    description;
    @attr('zone-type')
    type;
    @hasMany('door')
    doors;
    @hasMany('zones')
    children;
    @hasMany('zones', {inverse: 'children'})
    parent;
}

import { computed } from '@ember/object';
import Model, { attr, hasMany } from '@ember-data/model';
import { buildValidations, validator } from 'ember-cp-validations';
import DependentRelationships from '../mixins/dependent-relationships';

const ScheduleValidations = buildValidations(
    {
        name: [
            validator('presence', true),
            validator('ds-error'),
            validator('length', {
                min: 3,
                max: 50,
            })
        ]
    }
);

export default class ScheduleModel extends Model.extend(ScheduleValidations, DependentRelationships) {
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @attr('string')
    name;
    @attr('string')
    description;

    // This correspond to Leosac's SingleTimeFrame.
    // However, in the WebUI a timeframe entry can span multiple day
    // while Leosac's SingleTimeFrame is for 1 day only.
    @attr('timeframes')
    timeframes;
    @hasMany('schedule-mapping', { async: false })
    mapping;
}

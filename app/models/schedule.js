import { computed } from '@ember/object';
import DS from 'ember-data';
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

export default DS.Model.extend(ScheduleValidations, DependentRelationships, {
    numericId: computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),

    name: DS.attr('string'),
    description: DS.attr('string'),

    // This correspond to Leosac's SingleTimeFrame.
    // However, in the WebUI a timeframe entry can span multiple day
    // while Leosac's SingleTimeFrame is for 1 day only.
    timeframes: DS.attr('timeframes'),
    mapping: DS.hasMany('schedule-mapping', { async: false })
});

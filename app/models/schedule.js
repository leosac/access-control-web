import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    numericId: Ember.computed('id', function ()
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
});

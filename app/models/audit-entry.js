import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),

    author: DS.belongsTo('user'),
    // todo mb convert to 'utc' and store as a std::timepoint
    // server side
    timestamp: DS.attr('date-from-unix-timestamp'),
    eventMask: DS.attr('audit-event-type'),
    description: DS.attr('string'),
    finalized: DS.attr('boolean'),
});

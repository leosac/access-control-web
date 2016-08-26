import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    numericId: Ember.computed('id', function () {
        "use strict";
        return Number(this.get('id'));
    }),
    rank: DS.attr(''),
    timestamp: DS.attr('date-from-unix-timestamp'),
    group: DS.belongsTo('group'),
    user: DS.belongsTo('user'),
});

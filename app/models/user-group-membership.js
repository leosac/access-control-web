import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
    numericId: computed('id', function () {
        "use strict";
        return Number(this.get('id'));
    }),
    rank: DS.attr('group-rank'),
    timestamp: DS.attr('date-from-unix-timestamp'),
    group: DS.belongsTo('group'),
    user: DS.belongsTo('user'),
});

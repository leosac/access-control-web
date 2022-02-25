import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    numericId: computed('id', function () {
        "use strict";
        return Number(this.get('id'));
    }),
    message: DS.attr(),
    timestamp: DS.attr('date-from-unix-timestamp'),
});

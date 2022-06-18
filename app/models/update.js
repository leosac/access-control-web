import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default DS.Model.extend({
    intl: service(),

    numericId: computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),

    statusString: computed('status', function()
    {
        const st = this.get('status');
        if (st === 0) {
            return this.intl.t('pending');
        } else if (st === 1) {
            return this.intl.t('acknowledged');
        } else if (st === 2) {
            return this.intl.t('cancelled');
        }
    }),
    status: DS.attr('number'),
    checkpoint: DS.attr('number'),

    generatedAt: DS.attr('utc'),
    statusUpdatedAt: DS.attr('utc'),
    sourceModule: DS.attr('string'),
    description: DS.attr('string'),
});

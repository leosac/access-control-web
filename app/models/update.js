import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    i18n: Ember.inject.service(),

    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),

    statusString: Ember.computed('status', function()
    {
        const i18n = this.get('i18n');
        const st = this.get('status');
        if (st === 0)
            return i18n.t('pending');
        else if (st === 1)
            return i18n.t('acknowledged');
        else if (st === 2)
            return i18n.t('cancelled');
    }),
    status: DS.attr('number'),
    checkpoint: DS.attr('number'),

    generatedAt: DS.attr('utc'),
    statusUpdatedAt: DS.attr('utc'),
    sourceModule: DS.attr('string'),
    description: DS.attr('string'),
});

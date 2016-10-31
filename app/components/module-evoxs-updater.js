import Ember from 'ember';

export default Ember.Component.extend({
    i18n: Ember.inject.service(),
    store: Ember.inject.service('store'),
    evoxs: Ember.inject.service('module-evoxs'),
    fm: Ember.inject.service('flash-messages'),

    aps: [],

    /**
     * The result of check-update.
     */
    updateSt: [],

    /**
     * The list of known updates (no matter their status).
     */
    updates: [],

    pendingCheckUpdate: false,

    apsWithStatus: Ember.computed('aps.@each', 'updateSt.@each', function()
    {
        const self = this;
        const d = [];

        const findNeedUpdateFor = function(ap)
        {
            let needUpdate;
            self.get('updateSt').forEach((updateState) =>
            {
                if (updateState.id === ap.get('numericId'))
                    needUpdate = updateState['need-update'];
            });
            return needUpdate;
        };

        this.get('aps').forEach((ap) =>
        {
            d.push({ap: ap, needUpdate: findNeedUpdateFor(ap)});
        });

        return d;
    }),

    init()
    {
        this._super(...arguments);
        const self = this;
        this.get('store').findAll('evoxs-access-point').then((aps) =>
            {
                self.set('aps', aps);
            });

        this.get('evoxs').getUpdates().then((updates) => {
            this.set('updates', this.get('store').peekAll('evoxs-access-point-update'));
        });
    },
    actions:
    {
        checkUpdate()
        {
            this.set('pendingCheckUpdate', true);
            this.get('evoxs').checkUpdate().then((st) =>
            {
                this.set('updateSt', st);
                this.set('pendingCheckUpdate', false);
            });
        },
        startUpdate(ap)
        {
            this.get('evoxs').startUpdate(ap);
        },
        cancelUpdate(update)
        {
            this.get('evoxs').cancelUpdate(update).then(() =>
            {
                this.get('fm').success(this.get('i18n').t('evoxs.update.update_cancelled'));
            }).catch(() => {
                this.get('fm').danger(this.get('i18n').t('evoxs.update.update_cancel_failed'));
            });
        },
        acknowledgeUpdate(update)
        {
            this.get('evoxs').acknowledgeUpdate(update).then(() =>
            {
                this.get('fm').success(this.get('i18n').t('evoxs.update.update_acked'));
            }).catch(() => {
                this.get('fm').danger(this.get('i18n').t('evoxs.update.update_acked_failed'));
            });
        }
    }
});

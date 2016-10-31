import Ember from 'ember';
import {AccessPointUpdateStatus} from 'web/leosac-constant';

export default Ember.Component.extend({
    i18n: Ember.inject.service(),
    store: Ember.inject.service('store'),
    evoxs: Ember.inject.service('module-evoxs'),
    fm: Ember.inject.service('flash-messages'),

    _aps: [],

    /**
     * The result of check-update.
     */
    _updateSt: [],

    /**
     * The list of known updates (no matter their status).
     */
    _updates: [],
    pendingUpdates: Ember.computed('_hackTriggerRefresh', '_updates.@each', function ()
    {
        const pendingUpdates = [];
        this.get('_updates').forEach((update) =>
        {
            if (update.get('status') === AccessPointUpdateStatus.PENDING)
                pendingUpdates.push(update);
        });
        return pendingUpdates;
    }),
    nonPendingUpdates: Ember.computed('_hackTriggerRefresh', '_updates.@each', 'filteredAp.id', function ()
    {
        // Also apply the "by access point alias" filter.
        const updates = [];
        this.get('_updates').forEach((update) =>
        {
            const updateApId = Number.parseInt(update.belongsTo('accessPoint').id());
            if (update.get('status') !== AccessPointUpdateStatus.PENDING)
            {
                if ((this.get('filteredAp.id') && this.get('filteredAp.id') ==
                    updateApId) || !this.get('filteredAp.id'))
                {
                    updates.push(update);
                }
            }
        });
        return updates;
    }),

    pendingCheckUpdate: false,

    /**
     * The id of the access point we filter (updates history)
     */
    filteredAp: '',

    _apsWithStatus: Ember.computed('_hackTriggerRefresh', '_aps.@each', '_updateSt.@each', function ()
    {
        const self = this;
        const d = [];

        const findNeedUpdateFor = function (ap)
        {
            let needUpdate;
            self.get('_updateSt').forEach((updateState) =>
            {
                if (updateState.id === ap.get('numericId'))
                    needUpdate = updateState['need-update'];
            });
            return needUpdate;
        };

        this.get('_aps').forEach((ap) =>
        {
            d.push({ap: ap, needUpdate: findNeedUpdateFor(ap)});
        });
        return d;
    }),
    sortedApsWithStatus: Ember.computed.sort('_apsWithStatus', function (a, b)
    {
        return a.ap.id - b.ap.id;
    }),

    // A hack to trigger an update of the component's view.
    // It seems computed property cannot properly watch their target.
    _hackTriggerRefresh: 0,
    hackTriggerRefresh()
    {
        this.set('_hackTriggerRefresh', this.get('_hackTriggerRefresh') + 1);
    },
    init()
    {
        this._super(...arguments);
        const self = this;
        this.get('store').findAll('evoxs-access-point').then((aps) =>
        {
            self.set('_aps', aps);
        });

        this.get('evoxs').getUpdates().then((updates) =>
        {
            this.set('_updates', this.get('store').peekAll('evoxs-access-point-update'));
        });
    },
    actions: {
        checkUpdate()
        {
            this.set('pendingCheckUpdate', true);
            this.get('evoxs').checkUpdate().then((st) =>
            {
                this.set('_updateSt', st);
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
                this.hackTriggerRefresh();
            }).catch(() =>
            {
                this.get('fm').danger(this.get('i18n').t('evoxs.update.update_cancel_failed'));
            });
        },
        acknowledgeUpdate(update)
        {
            this.get('evoxs').acknowledgeUpdate(update).then(() =>
            {
                this.get('fm').success(this.get('i18n').t('evoxs.update.update_acked'));
                this.hackTriggerRefresh();
            }).catch(() =>
            {
                this.get('fm').danger(this.get('i18n').t('evoxs.update.update_acked_failed'));
            });
        }
    }
});

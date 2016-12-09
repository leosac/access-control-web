import Ember from 'ember';

export default Ember.Controller.extend({
    updater: Ember.inject.service('update'),
    fm: Ember.inject.service('flash-messages'),
    i18n: Ember.inject.service(),

    updateHistory: [],
    pendingUpdates: [],
    pendingCheckUpdate: false,
    updateDescriptors: [],

    refresh()
    {
        this.get('updater').getPending().then((updates) => {
            this.set('pendingUpdates', updates);
        });

        this.get('updater').getHistory().then((updates) => {
            this.set('updateHistory', updates);
        });
    },

    init()
    {
        this.refresh();
    },

    actions: {
        checkUpdate()
        {
            this.set('pendingCheckUpdate', true);
            this.get('updater').checkUpdate().then((updateDescriptors) => {
                if (updateDescriptors.length === 0)
                    this.get('fm').info(this.get('i18n').t('update.everything_up_to_date'));
                this.set('updateDescriptors', updateDescriptors);
                this.set('pendingCheckUpdate', false);
            });
        },
        createUpdate(updateDescriptor)
        {
            this.get('updater').createUpdate(updateDescriptor.uuid).then(() =>
            {
                this.get('fm').success('Update created.');
                this.set('updateDescriptors',
                    this.get('updateDescriptors').filter(i => i !== updateDescriptor));

                this.get('updater').getPending().then(()=>{
                    this.refresh();
                });
            });
        },
        acknowledgeUpdate(update)
        {
            this.get('updater').acknowledgeUpdate(update).then(() => {
                this.get('fm').success(this.get('i18n').t('update.update_acked'));
                this.refresh();
            }).catch(()=>{
                this.get('fm').danger(this.get('i18n').t('update.update_acked_failed'));
            });
        },
        cancelUpdate(update)
        {
            this.get('updater').cancelUpdate(update).then(() => {
                this.get('fm').success(this.get('i18n').t('update.update_cancelled'));
                this.refresh();
            }).catch(() => {
                this.get('fm').danger(this.get('i18n').t('update.update_cancelled_failed'));
            });
        }
    }
});

import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    updater: service('update'),
    flashMessages: service(),
    intl: service(),

    updateHistory: [],
    pendingUpdates: [],
    pendingCheckUpdate: false,
    updateDescriptors: [],

    // The update the we are seeing the details of.
    detailedUpdate: {},
    openDetailsModal: false,

    refresh()
    {
        this.get('updater').getHistory().then((updates) =>
        {
            this.set('updateHistory', updates);
        });

        this.get('updater').getPending().then((updates) =>
        {
            this.set('pendingUpdates', updates);
        });
    },

    init()
    {
        this._super(...arguments);
    },

    actions: {
        checkUpdate()
        {
            this.set('pendingCheckUpdate', true);
            this.get('updater').checkUpdate().then((updateDescriptors) =>
            {
                if (updateDescriptors.length === 0) {
                    this.flashMessages.info(this.intl.t('update.everything_up_to_date'));
                }
                this.set('updateDescriptors', updateDescriptors);
                this.set('pendingCheckUpdate', false);
            });
        },
        createUpdate(updateDescriptor)
        {
            this.get('updater').createUpdate(updateDescriptor.uuid).then(() =>
            {
                this.flashMessages.success('Update created.');
                this.set('updateDescriptors',
                    this.get('updateDescriptors').filter(i => i !== updateDescriptor));

                this.get('updater').getPending().then(() =>
                {
                    this.refresh();
                });
            });
        },
        acknowledgeUpdate(update)
        {
            this.get('updater').acknowledgeUpdate(update).then(() =>
            {
                this.flashMessages.success(this.intl.t('update.update_acked'));
                this.refresh();
            }).catch(() =>
            {
                this.flashMessages.danger(this.intl.t('update.update_acked_failed'));
            });
        },
        cancelUpdate(update)
        {
            this.get('updater').cancelUpdate(update).then(() =>
            {
                this.flashMessages.success(this.intl.t('update.update_cancelled'));
                this.refresh();
            }).catch(() =>
            {
                this.flashMessages.danger(this.intl.t('update.update_cancel_failed'));
            });
        },
        showDetails(update) {
            this.set('openDetailsModal', true);
            this.set('detailedUpdate', update);
        },
    }
});

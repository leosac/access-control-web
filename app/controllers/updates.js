import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UpdatesController extends Controller {
    @service('update')
    updater;
    @service
    flashMessages;
    @service
    intl;

    updateHistory = [];
    pendingUpdates = [];
    pendingCheckUpdate = false;
    updateDescriptors = [];

    // The update the we are seeing the details of.
    detailedUpdate = {};
    @tracked
    openDetailsModal = false;

    refresh()
    {
        this.updater.getHistory().then((updates) =>
        {
            this.updateHistory = updates;
        });

        this.updater.getPending().then((updates) =>
        {
            this.pendingUpdates = updates;
        });
    }

    @action
    checkUpdate()
    {
        this.pendingCheckUpdate = true;
        this.updater.checkUpdate().then((updateDescriptors) =>
        {
            if (updateDescriptors.length === 0) {
                this.flashMessages.info(this.intl.t('update.everything_up_to_date'));
            }
            this.updateDescriptors = updateDescriptors;
            this.pendingCheckUpdate = false;
        });
    }

    @action
    createUpdate(updateDescriptor)
    {
        this.updater.createUpdate(updateDescriptor.uuid).then(() =>
        {
            this.flashMessages.success('Update created.');
            this.updateDescriptors = this.updateDescriptors.filter(i => i !== updateDescriptor);

            this.updater.getPending().then(() =>
            {
                this.refresh();
            });
        });
    }

    @action
    acknowledgeUpdate(update)
    {
        this.updater.acknowledgeUpdate(update).then(() =>
        {
            this.flashMessages.success(this.intl.t('update.update_acked'));
            this.refresh();
        }).catch(() =>
        {
            this.flashMessages.danger(this.intl.t('update.update_acked_failed'));
        });
    }

    @action
    cancelUpdate(update)
    {
        this.updater.cancelUpdate(update).then(() =>
        {
            this.flashMessages.success(this.intl.t('update.update_cancelled'));
            this.refresh();
        }).catch(() =>
        {
            this.flashMessages.danger(this.intl.t('update.update_cancel_failed'));
        });
    }

    @action
    showDetails(update) {
        this.openDetailsModal = true;
        this.detailedUpdate = update;
    }
}

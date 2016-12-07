import Ember from 'ember';

export default Ember.Controller.extend({
    updater: Ember.inject.service('update'),
    fm: Ember.inject.service('flash-messages'),

    pendingUpdates: [],
    pendingCheckUpdate: false,
    updateDescriptors: [],

    init()
    {
        this.get('updater').getPending().then(() => {
            this.set('pendingUpdates', this.get('store').findAll('update'));
        });
    },

    actions: {
        checkUpdate()
        {
            this.set('pendingCheckUpdate', true);
            this.get('updater').checkUpdate().then((updateDescriptors) => {
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

                this.get('updater').getPending();
            });
        },
        acknowledgeUpdate(update)
        {
            this.get('updater').acknowledgeUpdate(update).then(() => {
                this.get('fm').success('Update acknowledged.');
            });
        },
        cancelUpdate(update)
        {
            this.get('updater').cancelUpdate(update).then(() => {
                this.get('fm').success('Update cancelled.');
            });
        }
    }
});

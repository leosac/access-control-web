import Ember from 'ember';

/**
 * For now the following 3 components are almost copy-pasted.
 *
 *     + user-schedules
 *     + group-schedules
 *     + credential-schedules
 */
export default Ember.Component.extend({
    authSrv: Ember.inject.service('authentication'),

    syncing: 0,

    greyedDisabledIfSyncing: Ember.computed('syncing', function ()
    {
        if (this.get('syncing'))
            return 'disabled-greyed';
        return '';
    }),

    // `group` is a property set by the caller.

    /**
     * An helper function that will save the current schedule / mapping
     * and will reload the user object so that the UI stays consistent.
     * @param mapping
     */
    saveMappingAndReloadUser(mapping)
    {
        const self = this;
        mapping.get('schedule').then((sched) =>
        {
            sched.save().then(() =>
            {
                self.get('group').reload().then(() =>
                {
                    self.decrSyncing();
                });
            });
        });
    },

    incrSyncing()
    {
        this.set('syncing', this.get('syncing') + 1);
    },
    decrSyncing()
    {
        this.set('syncing', this.get('syncing') - 1);
    },

    refreshImpl()
    {
        const self = this;
        this.incrSyncing();
        self.get('group').reload().then(() =>
        {
            self.get('group').get('schedules').then((scheds) =>
            {
                scheds.forEach((sched) =>
                {
                    self.incrSyncing();
                    sched.reload().then(() => {
                        self.decrSyncing();
                    });
                });
            });
            this.decrSyncing();
        });
    },

    didReceiveAttrs(){
        this.refreshImpl();
    },

    actions: {
        addScheduleMapping(mapping)
        {
            this.incrSyncing();
            mapping.get('groups').addObject(this.get('group'));
            this.saveMappingAndReloadUser(mapping);
        },
        leaveMapping(mapping)
        {
            const self = this;

            self.incrSyncing();
            mapping.get('groups').removeObject(self.get('group'));
            self.saveMappingAndReloadUser(mapping);
        },
        refresh()
        {
            this.refreshImpl();
        }
    }
});

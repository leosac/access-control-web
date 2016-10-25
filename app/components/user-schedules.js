import Ember from 'ember';

export default Ember.Component.extend({
    authSrv: Ember.inject.service('authentication'),

    syncing: 0,

    greyedDisabledIfSyncing: Ember.computed('syncing', function ()
    {
        if (this.get('syncing'))
            return 'disabled-greyed';
        return '';
    }),

    // `user` is a property set by the caller.

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
            sched.save().then((ok) =>
            {
                self.get('user').reload().then((ok) =>
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
        self.get('user').reload().then((ok) =>
        {
            self.get('user').get('schedules').then((scheds) =>
            {
                scheds.forEach((sched) =>
                {
                    self.incrSyncing();
                    sched.reload().then((ok) =>
                    {
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
            mapping.get('users').addObject(this.get('user'));
            this.saveMappingAndReloadUser(mapping);
        },
        leaveMapping(mapping)
        {
            const self = this;

            this.incrSyncing();
            mapping.get('users').removeObject(self.get('user'));
            this.saveMappingAndReloadUser(mapping);
        },
        refresh()
        {
            this.refreshImpl();
        }
    }
});

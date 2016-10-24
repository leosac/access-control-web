import Ember from 'ember';

export default Ember.Component.extend({
    authSrv: Ember.inject.service('authentication'),

    syncing: false,

    greyedDisabledIfSyncing: Ember.computed('syncing', function(){
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
                    self.set('syncing', false);
                });
            });
        });
    },

    actions: {
        addScheduleMapping(mapping)
        {
            this.set('syncing', true);

            mapping.get('users').addObject(this.get('user'));
            this.saveMappingAndReloadUser(mapping);
        },
        leaveMapping(mapping)
        {
            const self = this;

            this.set('syncing', true);
            mapping.get('users').removeObject(self.get('user'));
            this.saveMappingAndReloadUser(mapping);
        },
    }
});

import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * For now the following 3 components are almost copy-pasted.
 *
 *     + user-schedules
 *     + group-schedules
 *     + credential-schedules
 */
export default Component.extend({
    authSrv: service('authentication'),

    syncing: 0,

    greyedDisabledIfSyncing: computed('syncing', function ()
    {
        if (this.get('syncing')) {
            return 'disabled-greyed';
        }
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
                self.get('credential').reload().then(() =>
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
        self.get('credential').reload().then(() =>
        {
            self.get('credential').get('schedules').then((scheds) =>
            {
                scheds.forEach((sched) =>
                {
                    self.incrSyncing();
                    sched.reload().then(() =>
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
            mapping.get('credentials').addObject(this.get('credential'));
            this.saveMappingAndReloadUser(mapping);
        },
        leaveMapping(mapping)
        {
            const self = this;

            self.incrSyncing();
            mapping.get('credentials').removeObject(self.get('credential'));
            self.saveMappingAndReloadUser(mapping);
        },
        refresh()
        {
            this.refreshImpl();
        }
    }
});

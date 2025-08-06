import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * For now the following 3 components are almost copy-pasted.
 *
 *     + user-schedules
 *     + group-schedules
 *     + credential-schedules
 */
@classic
export default class UserSchedules extends Component {
    @service('authentication')
    authSrv;

    syncing = 0;

    @computed('syncing')
    get greyedDisabledIfSyncing() {
        if (this.get('syncing')) {
            return 'disabled-greyed';
        }
        return '';
    }

    // `user` is a property set by the caller.

    /**
     * An helper function that will save the current schedule / mapping
     * and will reload the user object so that the UI stays consistent.
     * @param mapping
     */
    saveMappingAndReloadUser(mapping) {
        const self = this;
        mapping.get('schedule').then((sched) =>
        {
            sched.save().then(() =>
            {
                self.get('user').reload().then(() =>
                {
                    self.decrSyncing();
                });
            });
        });
    }

    incrSyncing() {
        this.set('syncing', this.get('syncing') + 1);
    }

    decrSyncing() {
        this.set('syncing', this.get('syncing') - 1);
    }

    refreshImpl() {
        const self = this;
        this.incrSyncing();
        self.get('user').reload().then(() =>
        {
            self.get('user').get('schedules').then((scheds) =>
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
    }

    didReceiveAttrs() {
        this.refreshImpl();
    }

    @action
    addScheduleMapping(mapping) {
        this.incrSyncing();
        mapping.get('users').addObject(this.get('user'));
        this.saveMappingAndReloadUser(mapping);
    }

    @action
    leaveMapping(mapping) {
        const self = this;

        self.incrSyncing();
        mapping.get('users').removeObject(self.get('user'));
        self.saveMappingAndReloadUser(mapping);
    }

    @action
    refresh() {
        this.refreshImpl();
    }
}

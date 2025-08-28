import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

/**
 * For now the following 3 components are almost copy-pasted.
 *
 *     + user-schedules
 *     + group-schedules
 *     + credential-schedules
 */
export default class GroupSchedules extends Component {
    @service('authentication')
    authSrv;

    syncing = 0;

    /**
     * An helper function that will save the current schedule / mapping
     * and will reload the user object so that the UI stays consistent.
     * @param mapping
     */
    saveMappingAndReloadUser(mapping) {
        mapping.get('schedule').then((sched) =>
        {
            sched.save().then(() =>
            {
                this.args.group.reload().then(() =>
                {
                    this.decrSyncing();
                });
            });
        });
    }

    incrSyncing() {
        this.syncing++;
    }

    decrSyncing() {
        this.syncing--;
    }

    refreshImpl() {
        this.incrSyncing();
        this.args.group.reload().then(() =>
        {
            this.args.group.get('schedules').then((scheds) =>
            {
                scheds.forEach((sched) =>
                {
                    this.incrSyncing();
                    sched.reload().then(() => {
                        this.decrSyncing();
                    });
                });
            });
            this.decrSyncing();
        });
    }

    constructor(owner, args) {
        super(owner, args);
        this.refreshImpl();
    }

    @action
    addScheduleMapping(mapping) {
        this.incrSyncing();
        if (!mapping.get('groups').includes(this.args.group)) {
            mapping.get('groups').push(this.args.group);
        }
        this.saveMappingAndReloadUser(mapping);
    }

    @action
    leaveMapping(mapping) {
        this.incrSyncing();
        const index = mapping.get('groups').indexOf(this.args.group);
        if (index !== -1) {
            mapping.get('groups').splice(index, 1);
        }
        this.saveMappingAndReloadUser(mapping);
    }

    @action
    refresh() {
        this.refreshImpl();
    }
}

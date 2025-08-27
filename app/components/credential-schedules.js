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
export default class CredentialSchedules extends Component {
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
                this.args.credential.reload().then(() =>
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
        this.args.credential.reload().then(() =>
        {
            this.args.credential.get('schedules').then((scheds) =>
            {
                scheds.forEach((sched) =>
                {
                    this.incrSyncing();
                    sched.reload().then(() =>
                    {
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
        mapping.get('credentials').addObject(this.args.credential);
        this.saveMappingAndReloadUser(mapping);
    }

    @action
    leaveMapping(mapping) {
        this.incrSyncing();
        mapping.get('credentials').removeObject(this.args.credential);
        this.saveMappingAndReloadUser(mapping);
    }

    @action
    refresh() {
        this.refreshImpl();
    }
}

import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { DeviceClass } from 'web/leosac-constant';

function removeSchedule(selectedSchedules, schedule) {
    let loc = selectedSchedules.length || 0;
    while (loc-- > 0) {
        if (selectedSchedules.indexOf(schedule.get('id'))) {
            selectedSchedules.splice(loc, 1);
        }
    }
    return selectedSchedules;
}

/**
 * This component is here to allow us to modify the leosac-builtin-access-point.
 *
 * Thanks to the already created access-point(ap), the component will help make the ap useful.
 */

export default class LeosacBuiltinAccessPointForm extends Component {
    @service
    store;

    @service
    search;

    newDevice = null;

    constructor(owner, args) {
        super(owner, args);
        this.arrayOfDeviceClassWiegandReader = this.arrayOfDeviceClassWiegandReader || [DeviceClass.reader];
        this.selectedSchedules = this.selectedSchedules || [];

        this.selectedSchedules = [];
        this.args.ap.get('alwaysOpenSchedules').forEach((openSchedules) => {
            this.selectedSchedules.addObject(openSchedules);
        });
        this.args.ap.get('alwaysCloseSchedules').forEach((closeSchedules) => {
            this.selectedSchedules.addObject(closeSchedules);
        });
    }

    // This will add an authSource(device) to the access-point
    @action
    addAuthSources() {
            // if there is no device, this will do nothing
        if (!this.newDevice) {
            return;
        }

        this.store.find(this.newDevice.type, this.newDevice.id).then((device) => {
            this.args.ap.get('authSourcesDevice').addObject(device);
            this.newDevice = null;
        });
    }

    //This will remove a device from the authSources
    @action
    removeAuthSources(device) {
        this.args.ap.get('authSourcesDevice').removeObject(device);
    }

    /**
     * This function take a partial name of a Schedule
     *
     * it will search through the backend for every schedule matching this partial name,
     * and it will remove the schedules already used by this access point.
     *
     * @param partialName
     * @returns {*|PromiseLike<T>|Promise<T>}
     */
    @action
    searchSchedule(partialName) {
        return this.search.findScheduleByName(partialName).then((allSchedules) => {
            // allSchedules: A list of array with this parameter: ['id', 'name']
            let result = [];
            let arrayOfSelectedSchedulesId = [];

            this.selectedSchedules.forEach((schedule) => {
                arrayOfSelectedSchedulesId.push(schedule.id);
            });

            allSchedules.forEach((schedule) => {
                if (!arrayOfSelectedSchedulesId.includes(schedule.id)) {
                    result.push(schedule);
                }
            });
            return result;
        });
    }

    /**
     * This will add a schedule to the access-point alwaysCloseSchedule
     */
    @action
    addCloseSchedule() {
        // if there is no schedule, this will do nothing
        if (!this.newSchedule) {
            return;
        }

        this.selectedSchedules.addObject(this.newSchedule);
        this.store.find('schedule', this.newSchedule.id).then((newSchedule) => {
            this.args.ap.get('alwaysCloseSchedules').addObject(newSchedule);
            this.newSchedule = null;
        });
    }

    /**
     * This will add a schedule to the access-point alwaysOpenSchedule
     */
    @action
    addOpenSchedule() {
        if (!this.newSchedule) {
            return;
        }

        this.selectedSchedules.addObject(newSchedule);
        this.store.find('schedule', schedule.id).then((newSchedule) => {
            thps.args.ap.get('alwaysOpenSchedules').addObject(newSchedule);
            this.newSchedule = null;
        });
    }

    /**
     * This will remove a schedule to the access-point alwaysCloseSchedule
     */
    @action
    removeCloseSchedule(schedule) {
        this.selectedSchedules = removeSchedule(this.selectedSchedules, schedule);
        this.args.ap.get('alwaysCloseSchedules').removeObject(schedule);
    }

    /**
     * This will remove a schedule to the access-point alwaysOpenSchedule
     */
    @action
    removeOpenSchedule(schedule) {
        this.selectedSchedules = removeSchedule(this.get('selectedSchedules'), schedule);
        this.args.ap.get('alwaysOpenSchedules').removeObject(schedule);
    }
}

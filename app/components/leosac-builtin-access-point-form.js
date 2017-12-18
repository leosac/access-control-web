import Ember from 'ember';
import {DeviceClass} from 'web/leosac-constant';

function removeSchedule(selectedSchedules, schedule) {
    let loc = selectedSchedules.length || 0;
    while (loc-- > 0) {
        if (selectedSchedules.indexOf(schedule.get('id'))) {
            selectedSchedules.splice(loc, 1);
        }
    }
    return selectedSchedules;
}

export default Ember.Component.extend({
    store: Ember.inject.service('store'),
    search: Ember.inject.service('search'),
    arrayOfDeviceClassWiegandReader: [DeviceClass.reader],
    newDevice: null,

    selectedSchedules: [],

    init() {
        this._super(...arguments);

        this.set('selectedSchedules', []);
        this.get('ap.alwaysOpenSchedules').forEach((openSchedules) => {
            this.get('selectedSchedules').addObject(openSchedules);
        });
        this.get('ap.alwaysCloseSchedules').forEach((closeSchedules) => {
            this.get('selectedSchedules').addObject(closeSchedules);
        });
    },

    actions: {
            addDevice() {
                let device = this.get('newDevice');

                // if there is no device, this will do nothing
                if (!device)
                    return;

                this.get('store').find(device.type, device.id).then((device) => {
                    this.get('ap').get('authSourcesDevice').addObject(device);
                    this.set('newDevice', null);
                });
            },
            removeDevice(device) {
                this.get('ap').get('authSourcesDevice').removeObject(device);
            },
            /**
             * This function take a partial name of a Schedule
             *
             * it will search through the backend for every schedule matching this partial name,
             * and it will remove the schedules already used by this access point.
             *
             * @param partialName
             * @returns {*|PromiseLike<T>|Promise<T>}
             */
            searchSchedule(partialName) {
                return this.get('search').findScheduleByName(partialName).then((allSchedules) => {
                    // allSchedules: A list of array with this parameter: ['id', 'name']
                    let result = [];
                    let selectedSchedules = this.get('selectedSchedules');
                    let arrayOfSelectedSchedulesId = [];

                    selectedSchedules.forEach((schedule) => {
                        arrayOfSelectedSchedulesId.push(schedule.id);
                    });

                    allSchedules.forEach((schedule) => {
                        if (!arrayOfSelectedSchedulesId.includes(schedule.id)) {
                            result.push(schedule);
                        }
                    });
                    return result;
                });
            },
            addCloseSchedule() {
                const self = this;
                let schedule = this.get('newSchedule');

                // if there is no schedule, this will do nothing
                if (!schedule)
                    return;

                this.get('selectedSchedules').addObject(schedule);
                this.get('store').find('schedule', schedule.id).then((newSchedule) => {
                    self.get('ap').get('alwaysCloseSchedules').addObject(newSchedule);
                    self.set('newSchedule', null);
                });
            },
            addOpenSchedule() {
                const self = this;
                let schedule = this.get('newSchedule');

                if (!schedule)
                    return;

                this.get('selectedSchedules').addObject(schedule);
                this.get('store').find('schedule', schedule.id).then((newSchedule) => {
                    self.get('ap').get('alwaysOpenSchedules').addObject(newSchedule);
                    self.set('newSchedule', null);
                });
            },
            removeCloseSchedule(schedule) {
                this.set('selectedSchedules', removeSchedule(this.get('selectedSchedules'), schedule));
                this.get('ap').get('alwaysCloseSchedules').removeObject(schedule);
            },
            removeOpenSchedule(schedule) {
                this.set('selectedSchedules', removeSchedule(this.get('selectedSchedules'), schedule));
                this.get('ap').get('alwaysOpenSchedules').removeObject(schedule);
            }
        }
});

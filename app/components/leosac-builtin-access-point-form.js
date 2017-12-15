import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service('store'),
    arrayOfDeviceClassWiegandReader: [2],
    newDevice: null,

    selectedSchedules: [],

    init() {
        this._super(...arguments);
        this.get('store').findAll('schedule', {reload: true}).then((allSchedules) => {

            this.get('ap.alwaysOpenSchedules').forEach((openSchedules) => {
                this.get('selectedSchedules').addObject(openSchedules);
            });
            this.get('ap.alwaysCloseSchedules').forEach((closeSchedules) => {
                this.get('selectedSchedules').addObject(closeSchedules);
            });
            console.log(allSchedules);
            console.log(this.get('allSchedules'));
        });
    },

    allSchedules: Ember.computed('selectedSchedules.length', function () {
        let allSchedules = this.get('store').peekAll('schedule');

        console.log(allSchedules);
        if (!allSchedules) {
            return [];
        }

        let result = [];
        let selectedSchedules = this.get('selectedSchedules');
        let arrayOfSelectedSchedulesId = [];

        selectedSchedules.forEach((schedule) => {
            arrayOfSelectedSchedulesId.push(parseInt(schedule.get('id')));
        });

        console.log(allSchedules.length);
        

        for (let i = 0; i < allSchedules.length; i++) {
            if (!arrayOfSelectedSchedulesId.includes(parseInt(allSchedules[i].get('id')))) {
                result.push(allSchedules[i]);
            }
        }

        // if (index === array.length)
        //     console.log('OHIHIUSA');
        return result;
    }),

    actions:
        {
            addDevice() {
                let device = this.get('newDevice');
                this.get('store').find(device.type, device.id).then((device) => {
                    this.get('ap').get('authSourcesDevice').addObject(device);
                });
            }
            ,
            removeDevice(device) {
                this.get('ap').get('authSourcesDevice').removeObject(device);
            }
            ,
            addCloseSchedule() {
                const self = this;
                let schedule = this.get('newSchedule');
                this.get('selectedSchedules').addObject(schedule);
                this.get('store').find('schedule', schedule.id).then((newSchedule) => {
                    self.get('ap').get('alwaysCloseSchedules').addObject(newSchedule);
                    self.set('newSchedule', null);
                });
            }
            ,
            addOpenSchedule() {
                const self = this;
                let schedule = this.get('newSchedule');
                this.get('selectedSchedules').addObject(schedule);
                this.get('store').find('schedule', schedule.id).then((newSchedule) => {
                    self.get('ap').get('alwaysOpenSchedules').addObject(newSchedule);
                    self.set('newSchedule', null);
                });
            }
            ,
            removeCloseSchedule(schedule) {
                this.get('selectedSchedules').removeObject(schedule);
                this.get('ap').get('alwaysCloseSchedules').removeObject(schedule);
            }
            ,
            removeOpenSchedule(schedule) {
                this.get('selectedSchedules').removeObject(schedule);
                this.get('ap').get('alwaysOpenSchedules').removeObject(schedule);
            }
        }
})
;

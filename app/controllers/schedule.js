import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;
    @service
    store;

    @action
    editSchedule() {
        this.model.save().then(() =>
            {
                this.flashMessages.success('Schedule successfully edited.');
            },
            (error) =>
            {
                this.flashMessages.danger('An error occurred while editing schedule: ' + error);
            });
    }

    @action
    addMapping() {
        const newMapping = this.store.createRecord('schedule-mapping');
        newMapping.set('alias', 'Unnamed mapping');
        if (!this.model.get('mapping').includes(newMapping)) {
            this.model.get('mapping').push(newMapping);
        }
    }

    @action
    removeMapping(mapping) {
        const index = this.model.get('mapping').indexOf(mapping);
        if (index !== -1) {
            this.model.get('mapping').splice(index, 1);
        }
    }

    @action
    deleteSchedule() {
        this.model.destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Schedule has been deleted.');
            this.router.transitionTo('schedules.list');
        });
    }
}
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
            () =>
            {
                this.flashMessages.danger('An error occurred while editing schedule.');
            });
    }

    @action
    addMapping() {
        const newMapping = this.store.createRecord('schedule-mapping');
        newMapping.set('alias', 'Unnamed mapping');
        this.model.get('mapping').addObject(newMapping);
    }

    @action
    removeMapping(mapping) {
        this.model.get('mapping').removeObject(mapping);
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
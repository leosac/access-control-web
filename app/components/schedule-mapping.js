import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { findCredential } from 'web/leosac-credential-helper';

@classic
export default class ScheduleMapping extends Component {
    @service
    search;

    @service
    store;

    // Set the following properties:
    //    + mapping

    newDoor = null;

    newCredential = null;
    newUser = null;
    newGroup = null;

    @action
    addUser() {
        this.store.findRecord('user', this.get('newUser.id')).then((user) => {
            this.get('mapping').get('users').addObject(user);
        });
    }

    @action
    addGroup() {
        this.store.findRecord('group', this.get('newGroup.id')).then((grp) => {
            this.get('mapping').get('groups').addObject(grp);
        });
    }

    @action
    addCredential() {
        findCredential(this.store, this.get('newCredential')).then((cred) => {
            this.get('mapping').get('credentials').addObject(cred);
        });
        /*            this.store.findRecord('credential', this.get('newCredential')).then((cred) =>
        {
            this.get('mapping').get('credentials').addObject(cred);
        });*/
    }

    @action
    addDoor() {
        this.store.findRecord('door', this.get('newDoor.id')).then((door) => {
            this.get('mapping').get('doors').addObject(door);
        });
    }

    @action
    removeUser(user) {
        this.get('mapping').get('users').removeObject(user);
    }

    @action
    removeGroup(group) {
        this.get('mapping').get('groups').removeObject(group);
    }

    @action
    removeCredential(cred) {
        this.get('mapping').get('credentials').removeObject(cred);
    }

    @action
    removeDoor(door) {
        this.get('mapping').get('doors').removeObject(door);
    }

    @action
    searchGroup(partialName) {
        return this.search.findGroupByName(partialName);
    }

    @action
    searchUser(partialName) {
        return this.search.findUserByUsername(partialName);
    }

    @action
    searchDoor(partialName) {
        return this.search.findDoorByAlias(partialName);
    }
}

import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { findCredential } from 'web/leosac-credential-helper';

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
            if (!this.get('mapping').get('users').includes(user)) {
                this.get('mapping').get('users').push(user);
            }
        });
    }

    @action
    addGroup() {
        this.store.findRecord('group', this.get('newGroup.id')).then((grp) => {
            if (!this.get('mapping').get('groups').includes(grp)) {
                this.get('mapping').get('groups').push(grp);
            }
        });
    }

    @action
    addCredential() {
        findCredential(this.store, this.get('newCredential')).then((cred) => {
            if (!this.get('mapping').get('credentials').includes(cred)) {
                this.get('mapping').get('credentials').push(cred);
            }
        });
    }

    @action
    addDoor() {
        this.store.findRecord('door', this.get('newDoor.id')).then((door) => {
            if (!this.get('mapping').get('doors').includes(door)) {
                this.get('mapping').get('doors').push(door);
            }
        });
    }

    @action
    removeUser(user) {
        const index = this.get('mapping').get('users').indexOf(user);
        if (index !== -1) {
            this.get('mapping').get('users').splice(index, 1);
        }
    }

    @action
    removeGroup(group) {
        const index = this.get('mapping').get('groups').indexOf(group);
        if (index !== -1) {
            this.get('mapping').get('groups').splice(index, 1);
        }
    }

    @action
    removeCredential(cred) {
        const index = this.get('mapping').get('credentials').indexOf(cred);
        if (index !== -1) {
            this.get('mapping').get('credentials').splice(index, 1);
        }
    }

    @action
    removeDoor(door) {
        const index = this.get('mapping').get('doors').indexOf(door);
        if (index !== -1) {
            this.get('mapping').get('doors').splice(index, 1);
        }
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

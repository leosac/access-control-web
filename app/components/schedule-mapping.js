import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { findCredential } from 'web/leosac-credential-helper';

export default class ScheduleMapping extends Component {
    @service
    search;
    @service
    store;

    @tracked
    newDoor = null;
    @tracked
    newZone = null;
    @tracked
    newCredential = null;
    @tracked
    newUser = null;
    @tracked
    newGroup = null;

    @action
    addUser() {
        if (this.newUser) {
            console.log(this.newUser);
            this.store.findRecord('user', this.newUser.id).then((user) => {
                this.args.mapping.get('users').then(users => {
                    if (!users.includes(user)) {
                        users.push(user);
                    }
                });
            });
        }
    }

    @action
    addGroup() {
        this.store.findRecord('group', this.newGroup.id).then((grp) => {
            this.args.mapping.get('groups').then((groups) => {
                if (!groups.includes(grp)) {
                    groups.push(grp);
                }
            });
        });
    }

    @action
    addCredential() {
        findCredential(this.store, this.newCredential.id).then((cred) => {
            this.args.mapping.get('credentials').then((credentials) => {
                if (!credentials.includes(cred)) {
                    credentials.push(cred);
                }
            });
        });
    }

    @action
    addDoor() {
        this.store.findRecord('door', this.newDoor.id).then((door) => {
            this.args.mapping.get('doors').then((doors) => {
                if (!doors.includes(door)) {
                    doors.push(door);
                }
            });
        });
    }

    @action
    addZone() {
        this.store.findRecord('zone', this.newZone.id).then((zone) => {
            this.args.mapping.get('zones').then((zones) => {
                if (!zones.includes(zone)) {
                    zones.push(zone);
                }
            });
        });
    }

    @action
    removeUser(user) {
        this.args.mapping.get('users').then(users => {
            const index = users.indexOf(user);
            if (index !== -1) {
                users.splice(index, 1);
            }
        });
    }

    @action
    removeGroup(group) {
        this.args.mapping.get('groups').then((groups) => {
            const index = groups.indexOf(group);
            if (index !== -1) {
                groups.splice(index, 1);
            }
        });
    }

    @action
    removeCredential(cred) {
        this.args.mapping.get('credentials').then((credentials) => {
            const index = credentials.indexOf(cred);
            if (index !== -1) {
                credentials.splice(index, 1);
            }
        });
    }

    @action
    removeDoor(door) {
        this.args.mapping.get('doors').then((doors) => {
            const index = doors.indexOf(door);
            if (index !== -1) {
                doors.splice(index, 1);
            }
        });
    }

    @action
    removeZone(zone) {
        this.args.mapping.get('zones').then((zones) => {
            const index = zones.indexOf(zone);
            if (index !== -1) {
                zones.splice(index, 1);
            }
        });
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

    @action
    searchZone(partialName) {
        return this.search.findZoneByAlias(partialName);
    }
}

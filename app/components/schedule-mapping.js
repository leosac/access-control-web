import Ember from 'ember';
import {findCredential} from 'web/leosac-credential-helper';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),

    // Set the following properties:
    //    + mapping

    newDoor: null,
    newCredential: null,
    newUser: null,
    newGroup: null,
    actions: {
        addUser() {
            this.get('store').findRecord('user', this.get('newUser.id')).then((user) => {
                this.get('mapping').get('users').addObject(user);
            });
        },
        addGroup() {
            this.get('store').findRecord('group', this.get('newGroup.id')).then((grp) => {
                this.get('mapping').get('groups').addObject(grp);
            });
        },
        addCredential() {
            findCredential(this.get('store'), this.get('newCredential')).then((cred) => {
                this.get('mapping').get('credentials').addObject(cred);
            });
            /*            this.get('store').findRecord('credential', this.get('newCredential')).then((cred) =>
            {
                this.get('mapping').get('credentials').addObject(cred);
            });*/
        },
        addDoor() {
            this.get('store').findRecord('door', this.get('newDoor.id')).then((door) => {
                this.get('mapping').get('doors').addObject(door);
            });
        },
        removeUser(user) {
            this.get('mapping').get('users').removeObject(user);
        },
        removeGroup(group) {
            this.get('mapping').get('groups').removeObject(group);
        },
        removeCredential(cred) {
            this.get('mapping').get('credentials').removeObject(cred);
        },
        removeDoor(door) {
            this.get('mapping').get('doors').removeObject(door);
        },
        searchGroup(partialName) {
            return this.get('search').findGroupByName(partialName);
        },
        searchUser(partialName) {
            return this.get('search').findUserByUsername(partialName);
        },
        searchDoor(partialName) {
            return this.get('search').findDoorByAlias(partialName);
        }
    }
});

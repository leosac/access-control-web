import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service('websocket')
    ws;
    @service
    store;

    // JSON as returned by the `access_overview` Leosac WS call.

    rawData = null;
    selectedUsers = [];
    selectedDoors = [];

    @computed('{allDoors,selectedDoors.length}')
    displayedDoors() {
        if (!this.get('selectedDoors.length')) {
            return this.get('allDoors');
        } else {
            return this.get('selectedDoors');
        }
    }

    @computed('{rawData,selectedDoors.length}')
    allDoors() {
        const doors = [];
        let selectedDoorsId = [];
        let result = [];

        if (!this.get('rawData')) {
            return doors;
        }

        this.get('rawData').forEach((doorInfo) => {
            doors.push(this.store.peekRecord('door', doorInfo.door_id));
        });

        if (this.get('selectedDoors.length')) {
            this.get('selectedDoors').forEach((door) => {
                selectedDoorsId.push(parseInt(door.get('id')));
            });
        }

        doors.forEach((door) => {
            if (!selectedDoorsId.includes(parseInt(door.get('id')))) {
                result.push(door);
            }
        });
        return result;
    }

    @computed('{rawData,selectedUsers.length}')
    allUsers() {
        let userIds = [];
        let selectedUsersId = [];
        let users = [];
        let result = [];

        if (!this.get('rawData')) {
            return userIds;
        }

        this.get('rawData').forEach((doorInfo) => {
            doorInfo.user_ids.forEach((uid) => {
                userIds.push(uid);
            });
        });

        userIds = Array.from(new Set(userIds));

        userIds.forEach((id) => {
            users.push(this.store.peekRecord('user', id));
        });

        if (this.get('selectedUsers.length')) {
            this.get('selectedUsers').forEach((user) => {
                selectedUsersId.push(parseInt(user.get('id')));
            });
        }

        users.forEach((user) => {
            if (!selectedUsersId.includes(parseInt(user.get('id')))) {
                result.push(user);
            }
        });
        return result;
    }

    // will set the user door information
    @computed('{allDoors,allUsers,selectedDoors.length,selectedUsers.length}')
    userDoorInfo() {
        let selectedDoors = [];
        let userInfos = [];

        if (!this.get('rawData')) {
            return [];
        }

        const userCanAccessDoor = function (userId, door) {
            return door.user_ids.indexOf(parseInt(userId)) !== -1;
        };

        if (this.get('selectedDoors.length') || this.get('selectedUsers.length')) {
            // no doors selected, must display them all
            if (this.get('selectedDoors.length') === 0) {
                this.get('rawData').forEach((doorInfo) => {
                    selectedDoors.push(doorInfo);
                });

                this.get('selectedUsers').forEach((user) => {
                    const userData = {user: user, doors: []};
                    selectedDoors.forEach((doorInfo) => {
                        if (userCanAccessDoor(parseInt(user.get('id')), doorInfo)) {
                            userData['doors'].push(true);
                        } else {
                            userData['doors'].push(false);
                        }
                    });
                    userInfos.push(userData);
                });
            }
            // no users selected, must display them all
            else if (this.get('selectedUsers.length') === 0) {
                let userIds = [];
                this.get('rawData').forEach((doorInfo) => {
                    this.get('selectedDoors').forEach((door) => {
                        if (parseInt(door.get('id')) === doorInfo.door_id) {
                            selectedDoors.push(doorInfo);
                        }
                    });
                    doorInfo.user_ids.forEach((uid) => {
                        userIds.push(uid);
                    });
                });

                userIds = [...new Set(userIds)];

                userIds.forEach((uid) => {
                    const userData = {user: this.store.peekRecord('user', uid), doors: []};

                    selectedDoors.forEach((doorInfo) => {
                        if (userCanAccessDoor(uid, doorInfo)) {
                            userData['doors'].push(true);
                        } else {
                            userData['doors'].push(false);
                        }
                    });
                    userInfos.push(userData);
                });
            }
            // users and doors selected
            else {
                this.get('rawData').forEach((doorInfo) => {
                    this.get('selectedDoors').forEach((door) => {
                        if (parseInt(door.get('id')) === doorInfo.door_id) {
                            selectedDoors.push(doorInfo);
                        }
                    });
                });

                this.get('selectedUsers').forEach((user) => {
                    const userData = {user: user, doors: []};
                    selectedDoors.forEach((doorInfo) => {
                        if (userCanAccessDoor(parseInt(user.get('id')), doorInfo)) {
                            userData['doors'].push(true);
                        } else {
                            userData['doors'].push(false);
                        }
                    });
                    userInfos.push(userData);
                });
            }
        }
        // no users and doors selected
        else {
            let userIds = [];

            this.get('rawData').forEach((doorInfo) => {
                doorInfo.user_ids.forEach((uid) => {
                    userIds.push(uid);
                });
                selectedDoors.push(doorInfo);
            });

            userIds = [...new Set(userIds)];

            userIds.forEach((uid) => {
                const userData = {user: this.store.peekRecord('user', uid), doors: []};

                selectedDoors.forEach((doorInfo) => {
                    if (userCanAccessDoor(uid, doorInfo)) {
                        userData['doors'].push(true);
                    } else {
                        userData['doors'].push(false);
                    }
                });
                userInfos.push(userData);
            });
        }
        return userInfos;
    }

    //this will load and fetch all the user and door
    reload() {
        this.store.findAll('user', {reload: true}).then(() => {
            this.store.findAll('door', {reload: true}).then(() => {
                this.get('ws').sendJson('access_overview', {}).then((data) => {
                    this.set('rawData', data);
                });
            });
        });
    }
    
    constructor(owner, args) {
        super(owner, args);
    }

    @action
    addUser(user) {
        this.get('selectedUsers').addObject(user);
    }

    @action
    addDoor(door) {
        this.get('selectedDoors').addObject(door);
    }

    @action
    removeUser(user) {
        this.get('selectedUsers').removeObject(user);
    }

    @action
    removeDoor(door) {
        this.get('selectedDoors').removeObject(door);
    }
}

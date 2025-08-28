import { computed, action } from '@ember/object';
import { service } from '@ember/service';
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

    get displayedDoors() {
        if (!this.selectedDoors.length) {
            return this.allDoors;
        } else {
            return this.selectedDoors;
        }
    }

    get allDoors() {
        const doors = [];
        let selectedDoorsId = [];
        let result = [];

        if (!this.rawData) {
            return doors;
        }

        this.rawData.forEach((doorInfo) => {
            doors.push(this.store.peekRecord('door', doorInfo.door_id));
        });

        if (this.selectedDoors.length) {
            this.selectedDoors.forEach((door) => {
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

    get allUsers() {
        let userIds = [];
        let selectedUsersId = [];
        let users = [];
        let result = [];

        if (!this.rawData) {
            return userIds;
        }

        this.rawData.forEach((doorInfo) => {
            doorInfo.user_ids.forEach((uid) => {
                userIds.push(uid);
            });
        });

        userIds = Array.from(new Set(userIds));

        userIds.forEach((id) => {
            users.push(this.store.peekRecord('user', id));
        });

        if (this.selectedUsers.length) {
            this.selectedUsers.forEach((user) => {
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
    get userDoorInfo() {
        let selectedDoors = [];
        let userInfos = [];

        if (!this.rawData) {
            return [];
        }

        const userCanAccessDoor = function (userId, door) {
            return door.user_ids.indexOf(parseInt(userId)) !== -1;
        };

        if (this.selectedDoors.length || this.selectedUsers.length) {
            // no doors selected, must display them all
            if (this.selectedDoors.length === 0) {
                this.rawData.forEach((doorInfo) => {
                    selectedDoors.push(doorInfo);
                });

                this.selectedUsers.forEach((user) => {
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
            else if (this.selectedUsers.length === 0) {
                let userIds = [];
                this.rawData.forEach((doorInfo) => {
                    this.selectedDoors.forEach((door) => {
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
                this.rawData.forEach((doorInfo) => {
                    this.selectedDoors.forEach((door) => {
                        if (parseInt(door.get('id')) === doorInfo.door_id) {
                            selectedDoors.push(doorInfo);
                        }
                    });
                });

                this.selectedUsers.forEach((user) => {
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

            this.rawData.forEach((doorInfo) => {
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
                this.ws.sendJson('access_overview', {}).then((data) => {
                    this.rawData = data;
                });
            });
        });
    }

    @action
    addUser(user) {
        if (!this.selectedUsers.includes(user)) {
            this.selectedUsers.push(user);
        }
    }

    @action
    addDoor(door) {
        if (!this.selectedDoors.includes(door)) {
            this.selectedDoors.push(door);
        }
    }

    @action
    removeUser(user) {
        const index = this.selectedUsers.indexOf(user);
        if (index !== -1) {
            this.selectedUsers.splice(index, 1);
        }
    }

    @action
    removeDoor(door) {
        const index = this.selectedDoors.indexOf(door);
        if (index !== -1) {
            this.selectedDoors.splice(index, 1);
        }
    }
}

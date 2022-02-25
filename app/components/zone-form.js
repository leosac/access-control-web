import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    search: service('search'),
    store: service(),
    flashMessages: service(),

    newDoor: null,
    newChildren: null,
    allType: ['zone.type.logical', 'zone.type.physical'],
    doorAliasToObject: {},
    allAlias: [],
    selectedAlias: false,
    zone: false,

    actions: {
        addDoor() {
            this.get('store').findRecord('door', this.get('newDoor.id')).then((door) => {
                this.get('zone').get('doors').addObject(door);
            });
        },
        searchDoor(partialName) {
            return this.get('search').findDoorByAlias(partialName);
        },
        removeDoor(door) {
            this.get('zone').get('doors').removeObject(door);
        },
        addChildren() {
            this.get('store').findRecord('zone', this.get('newChildren.id')).then((children) => {
                this.get('zone').get('children').addObject(children);
            });
        },
        removeChildren(children) {
            this.get('zone').get('children').removeObject(children);
        }
    }
});

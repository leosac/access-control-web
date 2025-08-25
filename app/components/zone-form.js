import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class ZoneForm extends Component {
    @service('search')
    search;

    @service
    store;

    @service
    flashMessages;

    newDoor = null;
    newChildren = null;
    selectedAlias = false;
    zone = false;

    constructor(owner, args) {
        super(owner, args);
        this.allType = this.allType || ['zone.type.logical', 'zone.type.physical'];
        this.doorAliasToObject = this.doorAliasToObject || {};
        this.allAlias = this.allAlias || [];
    }

    @action
    addDoor() {
        this.store.findRecord('door', this.get('newDoor.id')).then((door) => {
            this.get('zone').get('doors').addObject(door);
        });
    }

    @action
    searchDoor(partialName) {
        return this.search.findDoorByAlias(partialName);
    }

    @action
    removeDoor(door) {
        this.get('zone').get('doors').removeObject(door);
    }

    @action
    addChildren() {
        this.store.findRecord('zone', this.get('newChildren.id')).then((children) => {
            this.get('zone').get('children').addObject(children);
        });
    }

    @action
    removeChildren(children) {
        this.get('zone').get('children').removeObject(children);
    }
}

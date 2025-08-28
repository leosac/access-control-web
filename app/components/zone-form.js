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

    constructor(owner, args) {
        super(owner, args);
        this.allType = this.allType || ['zone.type.logical', 'zone.type.physical'];
        this.doorAliasToObject = this.doorAliasToObject || {};
        this.allAlias = this.allAlias || [];
    }

    @action
    addDoor() {
        this.store.findRecord('door', this.newDoor.get('id')).then((door) => {
            if (!this.zone.get('doors').includes(door)) {
                this.zone.get('doors').push(door);
            }
        });
    }

    @action
    searchDoor(partialName) {
        return this.search.findDoorByAlias(partialName);
    }

    @action
    removeDoor(door) {
        const index = this.zone.get('doors').indexOf(door);
        if (index !== -1) {
            this.zone.get('doors').splice(index, 1);
        }
    }

    @action
    addChildren() {
        this.store.findRecord('zone', this.get('newChildren.id')).then((children) => {
            if (!this.zone.get('children').includes(children)) {
                this.zone.get('children').push(children);
            }
        });
    }

    @action
    removeChildren(children) {
        const index = this.zone.get('children').indexOf(children);
        if (index !== -1) {
            this.zone.get('children').splice(index, 1);
        }
    }
}

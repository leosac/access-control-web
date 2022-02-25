import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

// We needed some function for the tree

// This will add a node to the root, given a children
function addNode(root, child) {
    root.children.push(child);
}

// This will create a node that can be used by the jstree
function nodeFromZone(zone) {
    let type;

    if (zone.get('type') === 'zone.type.logical') {
        type = 'logicalZone';
    } else {
        type = 'physicalZone';
    }
    return {
        id: zone.get('id'),
        text: zone.get('alias'),
        state : {'opened' : true},
        children: [],
        type: type
    };
}

// This will get a node from the previously filled cache.
function getNodeFromCache(zone, cache) {
    if (cache[zone.get('id')]) {
        return (cache[zone.get('id')]);
    }
    else {
        cache[zone.get('id')] = nodeFromZone(zone);
        return (cache[zone.get('id')]);
    }
}

// This will get the door of the child zone recursively
function recursiveDoor(selectedZone) {
    let doorArray = [];
    selectedZone.get('children').forEach(function (zone) {
        doorArray = doorArray.concat(recursiveDoor(zone));
        if (zone.get('doors')) {
            zone.get('doors').forEach(function (door) {
                doorArray.push({
                    zone: zone.get('alias'),
                    door: door.get('alias'),
                    doorId: door.get('id')
                });
            });
        }
    });
    return (doorArray);
}

// This will return the zone that match the selected zone
function zoneFromSelectedZone(selectedZone, zones) {
    let value = null;

    zones.forEach(function (zone) {
        if (zone.get('id') === selectedZone.get('id')) {
            value = zone;
        }
    });
    return value;
}

// This will return the nodeId given the selected zone
function zoneFromId(nodeId, zones) {
    let value = null;

    zones.forEach(function (zone) {
        if (zone.get('id') === nodeId) {
            value = zone;
        }
    });
    return value;
}

export default Component.extend({
    intl: service(),
    search: service('search'),
    store: service(),
    selectedZone: '',
    newDoor: null,
    arrayDoor: [],

    // This is a list of plugin useful for the jstree
    "plugins": "types, dnd, sort, states",

    // This is a list of the type options. There is a different icon for each of them
    typesOptions: {
        "physical": {
            "icon": "fa fa-building"
        },
        "logical": {
            "icon": "assets/images/logical.jpg"
        },
        "physicalZone": {
            "icon": "fa fa-building-o"
        },
        "logicalZone": {
            "icon": "fa fa-user"
        }
    },
    'jsTreeActionReceiver': true,

    // This ember computed will set the data necessary for the jstree to work. This is a node tree
    zoneDataTree: computed('model', function () {
        // Blueprint for the physical and logical zone
        let physicalZoneNode = {
            'id': 'physicalRoot',
            'state' : {'opened' : true},
            'type': 'physical',
            'text': this.get('intl').t('physicalRoot'),
            'children': [] };
        let logicalZoneNode = {
            'id': 'logicalRoot',
            'state' : {'opened' : true},
            "type": "logical",
            'text': this.get('intl').t('logicalRoot'),
            'children': [] };
        let nodeCache = {};

        // enumerate each zone
        this.get('model').forEach(function (zone)
        {
            // check if the zone is in the cache
            const n = getNodeFromCache(zone, nodeCache);

            if (zone.get('parent.length') === 0)
            {
                if (zone.get('type') === 'zone.type.logical') {
                    addNode(logicalZoneNode, n);
                } else {
                    addNode(physicalZoneNode, n);
                }
            }
            else
            {
                zone.get('parent').forEach(function (parent)
                {
                    const m = getNodeFromCache(parent, nodeCache);
                    addNode(m, n);
                });
            }
        });
        return [physicalZoneNode, logicalZoneNode];
    }),
    /**
     * This is a native function that we override.
     *
     * @param operation
     * @param node
     * @param node_parent
     * @returns {boolean}
     */
    checkCallback(operation, node, node_parent) {

        //check if we try to move a node
        if (operation === 'move_node') {
            // check if the node is a node that we created otherwise it can't be moved
            if (node.type === 'logicalZone' ||
                node.type === 'physicalZone') {
                // If a node is of type logical,
                // she can only go in the logical part of the tree
                // For example:
                // the logical zone "admin_group" can only be located in logical zone like "users"
                if (node.type === 'logicalZone') {
                    if (node_parent.type === 'logicalZone' ||
                        node_parent.type === 'logical') {
                        return true;
                    }
                }
                // but if a zone is of type physical, she can either go in the physical or logical zone
                //  For example, the "server_room" can be part of the "admin_right" logical zone
                // or "floor" physical zone,
                else {
                    if (node_parent.type === 'physicalZone' ||
                        node_parent.type === 'physical' ||
                        node_parent.type === 'logicalZone') {
                        return true;
                    }
                }
            }
            return false;
        }
        return true;
    },
    actions:
        {
            addDoor() {
                this.get('store').findRecord('door', this.get('newDoor.id')).then((door) => {
                    let selectedZone = zoneFromSelectedZone(this.get('selectedZone'), this.get('model'));
                    let saveOk = () => {
                        this.get('flashMessages').success(this.get('intl').t('zone.error.successfully_added'));
                    };
                    let saveFail = () => {
                        this.get('flashMessages').danger(this.get('intl').t('zone.error.error_added'));
                    };

                    selectedZone.get('doors').addObject(door);
                    selectedZone.save().then(saveOk, saveFail);
                });
            },
            searchDoor(partialName) {
                return this.get('search').findDoorByAlias(partialName);
            },
            removeDoor(door) {
                let selectedZone = zoneFromSelectedZone(this.get('selectedZone'), this.get('model'));
                let saveOk = () => {
                    this.get('flashMessages').success(this.get('intl').t('zone.error.successfully_removed'));
                };
                let saveFail = () => {
                    this.get('flashMessages').danger(this.get('intl').t('zone.error.error_removed'));
                };

                selectedZone.get('doors').removeObject(door);
                selectedZone.save().then(saveOk, saveFail);
            },
            handleJstreeEventDidSelectNode(node) {
                let selectedNode = zoneFromId(node.id, this.get('model'));
                this.set('selectedZone', selectedNode);
                if (selectedNode) {
                    let arrayOfDoor = recursiveDoor(selectedNode);
                    arrayOfDoor.sort(function (a, b) {
                        return a.zone - b.zone;
                    });
                    this.set('arrayDoor', arrayOfDoor);
                }
            },
            // Mange the dragAndDrop
            handleJstreeEventDidMoveNode(node) {
                let oldParent = zoneFromId(node.old_parent, this.get('model'));
                let newParent = zoneFromId(node.parent, this.get('model'));
                let currentZone = zoneFromId(node.node.id, this.get('model'));
                let saveOk = () => {
                    this.get('flashMessages').success(this.get('intl').t('zone.error.edited_success'));
                };
                let saveFail = () => {
                    this.get('flashMessages').danger(this.get('intl').t('zone.error.edited_error'));
                };

                if (oldParent && newParent) {
                    currentZone.get('parent').pushObject(newParent);
                    currentZone.get('parent').removeObject(oldParent);
                    oldParent.save().then(() => {
                        newParent.save().then(saveOk, saveFail);
                    }, saveFail);
                }
                else if (oldParent) {
                    currentZone.get('parent').removeObject(oldParent);
                    oldParent.save().then(saveOk, saveFail);
                }
                else if (newParent) {
                    currentZone.get('parent').pushObject(newParent);
                    newParent.save().then(saveOk, saveFail);
                }
                this.get('jsTreeActionReceiver').send('moveNode');
            }
        }
});

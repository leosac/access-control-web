import Ember from "ember";
import DS from "ember-data";

function addNode(root, child) {
    root.children.push(child);
}

function nodeFromZone(zone) {
    let type;

    if (zone.get('type') === 'zone.type.logical')
        type = 'logicalZone';
    else
        type = 'physicalZone';
    return {
        id: zone.get('id'),
        text: zone.get('alias'),
        children: [],
        type: type
    };
}

function getNodeFromCache(zone, cache) {
    if (cache[zone.get('id')]) {
        return (cache[zone.get('id')]);
    }
    else {
        cache[zone.get('id')] = nodeFromZone(zone);
        return (cache[zone.get('id')]);
    }
}

function zoneFromSelectedZone(selectedZone, zones) {
    let value = null;

    zones.forEach(function (zone) {
        if (zone.get('id') === selectedZone.get('id'))
            value = zone;
    });
    return value;
}

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

function zoneFromId(nodeId, zones) {
    let value = null;

    zones.forEach(function (zone) {
        if (zone.get('id') === nodeId)
            value = zone;
    });
    return value;
}

export default Ember.Component.extend({
    newDoor: null,
    search: Ember.inject.service('search'),
    store: Ember.inject.service(),
    selectedZone: '',
    arrayDoor: [],

    "plugins": "types, dnd, sort, states",

    typesOptions: {
        "physical": {
            "icon": "fa fa-building"
        },
        "logical": {
            "icon": "fa fa-users"
        },
        "root": {
            "icon": "fa fa-cube"
        },
        "physicalZone": {
            "icon": "fa fa-building-o"
        },
        "logicalZone": {
            "icon": "fa fa-user"
        }
    },

    'jsTreeActionReceiver': true,

    zoneDataTree: Ember.computed('model', function () {
        let tree = {
            'text': 'Root',
            'id': 'Root',
            'type': 'root',
            'children': []
        };
        let physicalZoneNode = {
            'id': 'physicalRoot',
            'type': 'physical',
            'text': 'physicalRoot',
            'children': []
        };
        let logicalZoneNode = {
            'id': 'logicalRoot',
            "type": "logical",
            'text': 'logicalRoot',
            'children': []
        };
        let nodeCache = {};

        this.get('model').forEach(function (zone) {
            const n = getNodeFromCache(zone, nodeCache);

            if (zone.get('parent.length') === 0) {
                if (zone.get('type') === 'zone.type.logical')
                    addNode(logicalZoneNode, n);
                else
                    addNode(physicalZoneNode, n);
            }
            else {
                zone.get('parent').forEach(function (parent) {
                    const m = getNodeFromCache(parent, nodeCache);

                    addNode(m, n);
                });
            }
        });
        addNode(tree, physicalZoneNode);
        addNode(tree, logicalZoneNode);
        return tree;
    }),
    checkCallback(operation, node, node_parent, node_position, more) {
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
                        node_parent.type === 'logical')
                        return true;
                }
                // but if a zone is of type physical, she can either go in the physical or logical zone
                //  For example, the "server_room" can be part of the "admin_right" logical zone
                // or "floor" physical zone,
                else {
                    if (node_parent.type === 'physicalZone' ||
                        node_parent.type === 'physical' ||
                        node_parent.type === 'logicalZone')
                        return true;
                }
            }
            return false;
        }
        return true;
    },
    didRender: function() {
        this.get('jsTreeActionReceiver').send('openAll');
    },
    actions:
        {
            addDoor() {
                this.get('store').findRecord('door', this.get('newDoor.id')).then((door) => {
                    let selectedZone = zoneFromSelectedZone(this.get('selectedZone'), this.get('model'));
                    selectedZone.get('doors').addObject(door);
                    selectedZone.save();
                });
            },
            searchDoor(partialName) {
                return this.get('search').findDoorByAlias(partialName);
            },
            removeDoor(door) {
                let selectedZone = zoneFromSelectedZone(this.get('selectedZone'), this.get('model'));
                selectedZone.get('doors').removeObject(door);
                selectedZone.save();
            },
            saveTree() {
                this.get('model').save();
            },
            expandAll() {
                this.get('jsTreeActionReceiver').send('openAll');
            },
            collapseAll() {
                this.get('jsTreeActionReceiver').send('closeAll');
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
            listDoor() {
                return this.get('selectedZone').get('doors');
            },
            closeAllNodes() {
                this.get('jsTreeActionReceiver').send('closeAll');
            },
            handleJstreeEventDidMoveNode(node) {
                let oldParent = zoneFromId(node.old_parent, this.get('model'));
                let newParent = zoneFromId(node.parent, this.get('model'));
                let currentZone = zoneFromId(node.node.id, this.get('model'));
                let saveOk = () => {
                    this.get('flashMessages').success('Zone successfully edited.');
                };
                let saveFail = () => {
                    this.get('flashMessages').danger('An error occurred while editing zone');
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
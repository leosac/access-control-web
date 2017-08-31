import Ember from "ember";
import DS from "ember-data";

function addNode(root, child) {
    console.log(root.text + " is the parent and " + child.text + " is the child to add.");
    console.log("The type of root.children is " + typeof root.children);
    console.log("The type of child is " + typeof child);

    root.children.push(child);

    console.log(child.text + " correctly added as child to " + root.text);
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

function checkType(node, model) {
    console.log(model);
    console.log(node);
}

function getNodeFromCache(zone, cache) {
    if (cache[zone.get('id')]) {
        console.log(zone.get('alias') + " was in cache");
        return (cache[zone.get('id')]);
    }
    else {
        console.log(zone.get('alias') + " was not  in cache");
        cache[zone.get('id')] = nodeFromZone(zone);
        // console.log(cache[zone.get('id')].children);
        return (cache[zone.get('id')]);
    }
}

function nodeFromId(nodeId, zones) {
    let value = null;
    zones.forEach(function (zone) {
        if (zone.get('id') === nodeId)
            value = zone;
    });
    if (value)
        return value;
    else
        return -1;
}

export default Ember.Component.extend({
    "plugins": "types, dnd, contextmenu, sort",

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
        console.log(this.get('model'));
        console.log("ENTERING TREE-VIEW");
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
        let i = 0;

        let tree = {
            'text': 'Root',
            'id': 'Root',
            'type': 'root',
            'children': []
        };
        this.get('model').forEach(function (zone) {
            const n = getNodeFromCache(zone, nodeCache);
            console.log("Zone loop number " + i++);
            console.log("The zone for this loop is " + zone.get('alias'));
            if (zone.get('parent.length') === 0) {
                console.log(zone.get('alias') + " got no parent, unfortunately...");
                if (zone.get('type') === 'zone.type.logical')
                    addNode(logicalZoneNode, n);
                else
                    addNode(physicalZoneNode, n);
            }
            else {
                let j = 0;
                console.log(zone.get('alias') + " got a parent!");
                zone.get('parent').forEach(function (parent) {
                    const m = getNodeFromCache(parent, nodeCache);
                    console.log("Child loop number " + j++);
                    addNode(m, n);
                });
            }
        });
        addNode(tree, physicalZoneNode);
        addNode(tree, logicalZoneNode);
        console.log("Here is the final tree ");
        console.log(tree);
        console.log("EXITING TREE-VIEW");
        return tree;
    }),
    checkCallback(operation, node, node_parent, node_position, more) {

        //check if we try to move a node
        if (operation === 'move_node') {
            // check if the node is a node that we created otherwise it can't be moved
            if (node.type === 'logicalZone' ||
                node.type === 'physicalZone')
            {
                // If a node is of type logical,
                // she can either go in the logical part of the tree,
                // or in the physical zone that we created
                // For example:
                // the logical zone "admin_group" can be located in the physical zone "admin_room"
                if (node.type === 'logicalZone')
                {
                    if (node_parent.type === 'logicalZone' ||
                        node_parent.type === 'logical')
                        return true;
                }
                // but if a zone is of type physical, she can only go in the physical zone
                // If we take the example above, the "admin_room" can only be part of the "floor" or "building" physical zone,
                // there is no point in allowing him to be part of a logical zone
                else
                {
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

    actions:
        {
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
                this.get('jsTreeActionReceiver').send('getNode', node.id);
            },
            handleJstreeGetNode(node) {
                console.log(node);
            },
            closeAllNodes() {
                this.get('jsTreeActionReceiver').send('closeAll');
            },

            handleJstreeEventDidMoveNode(node) {
                console.log(node);
                let currentZone;
                let newParent;
                let oldParent;
                let allow = 0;

                if ((oldParent = nodeFromId(node.old_parent, this.get('model'))) === -1)
                    allow += 1;
                if ((newParent = nodeFromId(node.parent, this.get('model'))) === -1)
                    allow += 2;

                currentZone = nodeFromId(node.node.id, this.get('model'));

                // if the oldParent is illegal, like he is root-like
                if  (allow === 1)
                {
                    currentZone.get('parent').pushObject(newParent);
                    newParent.save().then(() => {
                            this.get('flashMessages').success('Zone successfully edited.');
                        },
                        () => {
                            this.get('flashMessages').danger('An error occurred while editing zone');

                        });
                }
                // if the newParent is illegal, like he is root-like
                else if (allow === 2)
                {
                    currentZone.get('parent').removeObject(oldParent);
                    oldParent.save().then(() => {
                            this.get('flashMessages').success('Zone successfully edited.');
                        },
                        () => {
                            this.get('flashMessages').danger('An error occurred while editing zone');
                        });
                }
                // if both parent are legal
                else if (allow === 0)
                {
                    currentZone.get('parent').pushObject(newParent);
                    currentZone.get('parent').removeObject(oldParent);
                    oldParent.save().then(() => {
                            newParent.save().then(() => {
                                    this.get('flashMessages').success('Zone successfully edited.');
                                },
                                () => {
                                    this.get('flashMessages').danger('An error occurred while editing zone');

                                });
                        },
                        () => {
                            this.get('flashMessages').danger('An error occurred while editing zone');
                        });
                }

                // the last case is when both parent are illegal,
                // but in this case, with the checkback notification,
                // it means that the zone doesn't move, so it should be ignored
                console.log("The zone can be moved");
                this.get('jsTreeActionReceiver').send('moveNode');
            }
        }
});
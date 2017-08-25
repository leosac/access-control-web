import Ember from "ember";
import DS from "ember-data";

function addNode(root, child) {
    root.children.push(child);
}

function nodeFromZone(zone) {
    return {
        id: zone.get('id'),
        text: zone.get('alias'),
    };
}

function getNodeFromCache(zone, cache)
{
    if (cache[zone.get('id')])
        return (cache[zone.get('id')]);
    else
    {
        cache[zone.get('id')] = nodeFromZone(zone);
        return (cache[zone.get('id')]);
    }
}

export default Ember.Component.extend({
    "plugins" : "dnd, type",
    'jstreeActionReceiver': true,
    dataOriginal: {
        "id": "8675309",
        "type": "user",
        "attributes": {
            "name": "Anfanie Farmeo"
        },
        "relationships": {
            "payment-methods": {
                "data": [{
                    "id": "1",
                    "type": "PaymentMethodPaypal"
                }, {
                    "id": "2",
                    "type": "PaymentMethodCc"
                }, {
                    "id": "3",
                    "type": "PaymentMethodApplePay"
                }]
            }
        }
    },
    // we should have something like that: ->
    dataToAim: {
        "id": "8675309",
        "type": "user",
        "text": "Anfanie Farmeo",
        "children": [{
            "id": "1",
            "type": "PaymentMethodPaypal",
        }, {
            "id": "2",
            "type": "PaymentMethodCc"
        }, {
            "id": "3",
            "type": "PaymentMethodApplePay"
        }]
    },
    // findAll() {
    //     console.log(this.get('model'));
    // },
    //     zoneData: Ember.computed('model', function() {
    //let i = 0;
    //let treeData = this.get('model').map(function (zone) {
    //            let branch = zone.get('parent');
    //                console.log("there is a parent");
    //               zone.parent = '#';
    //            console.log(zone.get('parent'));
    //            let child = null;

    // There is something that need to be done here,
    // we have to convert the relationships to an array.
    // It should be like the format above.
    //});
    // });
    // console.log(this.get('model'));
    data: Ember.computed('model', function(){
        let seq = 0;
        let treeData = this.get('model').forEach(function(zone) {
            console.log(zone.get('alias'));
            return {
                id: "node" + seq++,
                text: zone.get('alias'),
            };
        });

        let idMap = {};
        treeData.forEach(function(node) {
            idMap[node.parent] = node.id;
        });

        treeData.forEach(function(node) {
            if (node.parent !== "#") {
                node.parent = idMap[node.parent];
            }
        });
        console.log("oui");
        console.log(treeData);
        return treeData;
    }),

    zoneDataTree: Ember.computed('model', function(){
        let physicalZoneNode = {'id': 'physicalRoot', 'text': 'physicalRoot', 'children': []};
        let loggicalZoneNode = {'id': 'logicalRoot', 'text': 'logicalRoot', 'children': []};
        let nodeCache = {};

        let tree = {'children': []};
        this.get('model').forEach(function(zone){
           const n = getNodeFromCache(zone, nodeCache);
            console.log(zone.get('parent.length'));
            if (zone.get('parent.length') === 0)
            {
                if (zone.get('type') === 'zone.type.logical')
                    addNode(loggicalZoneNode, n);
                else
                    addNode(physicalZoneNode, n);
            }
            else
            {
                zone.get('parent').forEach(function(parent) {
                    const m = getNodeFromCache(parent, nodeCache);
                    addNode(m, n);
                });
            }
        });
        addNode(tree, physicalZoneNode);
        addNode(tree, loggicalZoneNode);
        return tree;
    }),
    zoneData: Ember.computed('model', function(){
        let treeData = this.get('model').forEach(function(zone) {
            let parent = zone.get('parent');
            console.log(parent);
            var getKeys = function(obj){
                var keys = [];
                for(var key in obj){
                    keys.push(key);
                }
                return keys;
            };
            console.log(getKeys(parent));
            if (parent.get('content').length === 0) {
                parent.pushObject('#');
                console.log(parent);
            }
            console.log(getKeys(parent));
            // let splitPath = path.split("/");
            // let parentPath = splitPath.slice(0, -1).join("/");
            // let fileName = splitPath[splitPath.length - 1];
            // if (parentPath === "") {
            //     parentPath = "#";
            // }
            // return {
            //     id: "node" + seq++,
            //     text: fileName,
            //     parent: parentPath,
            //     icon: "glyphicon glyphicon-file light-gray",
            //     path: path,
            //     leaf: true
            // };
        });
    }),
    actions:
        {
            // handleJstreeEventDidChange(newData, data) {
            //     let oui = newData;
            //     console.log(oui);
            //     const x = this.get('jstreeActionReceiver').send('getParent', oui.node);
            //     console.log(x);
            //     //    console.log(this.get('data'));
            // },
            closeAllNodes() {
                this.get('jstreeActionReceiver').send('closeAll');
            }
            // actionGetParent(parent) {
            //     console.log("Received parent.");
            //     console.log(parent);
            // }
        }
});
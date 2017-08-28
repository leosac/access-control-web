import Ember from "ember";
import DS from "ember-data";

function addNode(root, child) {
    console.log(root.text + " is the parent and " + child.text + " is the child to add.");
    console.log("The type of root.children is " + typeof root.children);
    console.log("The type of child is " + typeof child);

    root.children.push(child);

    console.log(child.text + " correctly added as child to " + root.text);
}

function addChildren(child) {
    if (child.length)
        return {
        };
    else
        return {
            child
        }
}

function nodeFromZone(zone)
{
    return {
        id: zone.get('id'),
        text: zone.get('alias'),
        children : [
            //addChildren(zone.get('children'))
        ]
    };
}

function getNodeFromCache(zone, cache)
{
    if (cache[zone.get('id')]) {
        console.log(zone.get('alias') + " was in cache");
        return (cache[zone.get('id')]);
    }
    else
    {
        console.log(zone.get('alias') + " was not  in cache");
        cache[zone.get('id')] = nodeFromZone(zone);
        // console.log(cache[zone.get('id')].children);
        return (cache[zone.get('id')]);
    }
}

export default Ember.Component.extend({
    "plugins" : "types, unique, dnd",
    "types": {
        "physical": {
            "icon": "glyphicon glyphicon-tag"
        },
        "logical": {
            "icon": "fa fa-building-o"
        }
    },
    'jstreeActionReceiver': true,

    zoneDataTree: Ember.computed('model', function(){
        console.log("ENTERING TREE-VIEW");
        let physicalZoneNode = {'id': 'physicalRoot', "type": "physical",'text': 'physicalRoot', 'children': []};
        let logicalZoneNode = {'id': 'logicalRoot', "type": "logical",'text': 'logicalRoot', 'children': []};
        let nodeCache = {};
        let i = 0;

        let tree = {'text': 'Root', 'id': 'Root','children': []};
        this.get('model').forEach(function(zone){
            const n = getNodeFromCache(zone, nodeCache);
            console.log("Zone loop number " + i++);
            console.log("The zone for this loop is " + zone.get('alias'));
            if (zone.get('parent.length') === 0)
            {
                console.log(zone.get('alias') + " got no parent, unfortunately...");
                if (zone.get('type') === 'zone.type.logical')
                    addNode(logicalZoneNode, n);
                else
                    addNode(physicalZoneNode, n);
            }
            else
            {
                let j = 0;
                console.log(zone.get('alias') + " got a parent!");
                zone.get('parent').forEach(function(parent) {
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
    actions:
        {
            expandAll() {
                this.get('jsTreeActionReceiver').send('openAll');
            },
            collapseAll() {
                this.get('jsTreeActionReceiver').send('closeAll');
            },
            handleJstreeEventDidChange(node) {
               // this.get('jsTreeActionReceiver').send('getNode', node);
            },
            closeAllNodes() {
                this.get('jsTreeActionReceiver').send('closeAll');
            }
        }
});
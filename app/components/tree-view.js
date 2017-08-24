import Ember from "ember";

export default Ember.Component.extend({
    "plugins" : "dnd",
    'jstreeActionReceiver': true,
    dataToDo: [
        {
            'text': 'parent 1',
            'state': {
                'opened': true
            },
            'children': [
                {'text': 'child 1'},
                {'text': 'child 2'},
                {'text': 'child 3'}
            ],
        },
        {
            'text': 'parent 2',
            'children': [
                {'text': 'child 1'}
            ]
        }
    ],

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
    // It should be like:
    // Like the format above.
    //});
    // });
    // console.log(this.get('model'));
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
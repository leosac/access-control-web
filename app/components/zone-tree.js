import Ember from 'ember';

export default Ember.Component.extend({
    "plugins" : "dnd",
    'jstreeActionReceiver': true,
    data: [
        {
            'text': 'Company 1',
            'id': 'company-1',
            'state': {
                'opened': true
            },
            'children': [
                {
                    'text': 'Headoffice',
                    'children': [
                        {'text': 'Branch 1',
                            'id': "lol"
                        },
                        {'text': 'Branch 2',
                            'id': "lol"
                        },
                    ]
                }
            ]
        },
        {
            'text': 'Company 2',
            'children': [
                {'text': 'Headoffice'}
            ]
        }
    ],
    actions:
        {
            handleJstreeEventDidChange(newData, data) {
                let oui = newData;
                console.log(oui);
                const x = this.get('jstreeActionReceiver').send('getParent', oui.node);
                console.log(x);
                //    console.log(this.get('data'));
            },
            closeAllNodes() {
                this.get('jstreeActionReceiver').send('closeAll');
            },
            actionGetParent(parent) {
                console.log("Received parent.");
                console.log(parent);
            }
        }
})
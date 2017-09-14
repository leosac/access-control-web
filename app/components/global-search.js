import Ember from 'ember';

function mySortByTypeThenName(a, b) {
    let typeA = a.type;
    let typeB = b.type;

    if (typeA === typeB)
    {
        let x = a.content.toLowerCase(), y = b.content.toLowerCase();

        return x < y ? -1 : x > y ? 1 : 0;
    }
    return typeA < typeB ? -1 : typeA > typeB ? 1 : 0;
}

export default Ember.Component.extend({
    globalInfo: Ember.inject.service('leosac-info'),
    search: Ember.inject.service('search'),
    flashMessages: Ember.inject.service(),
    i18n: Ember.inject.service(),
    store: Ember.inject.service(),

    dataToObject: {},
    groupedNumbers: [
        { groupName: 'user', options: [] },
        { groupName: 'zones', options: [] },
        { groupName: 'doors', options: [] },
        { groupName: 'groups', options: [] },
        { groupName: 'pincode', options: [] },
        { groupName: 'credentials.rfid_card.title', options: [] },
        { groupName: 'schedules', options: [] },
        ],
    allObjects: [],
    selectedObjects: false,
    selected: '',

    init() {
        this._super(...arguments);
    },
    didReceiveAttrs()
    {
        // const content = [];
        //
        // this.get('store').findAll('user', {reload: true}).then((objects) =>
        // {
        //     objects.forEach((object) =>
        //     {
        //         let typeObject = {
        //             type: 'user',
        //             id: '',
        //             content: ''
        //         };
        //         typeObject.id = object.get('id');
        //         typeObject.content = object.get('username');
        //         content.push(typeObject);
        //     });
        //     this.get('store').findAll('zone', {reload: true}).then((objects) =>
        //     {
        //         objects.forEach((object) =>
        //         {
        //             let typeObject = {
        //                 type: 'zones',
        //                 id: '',
        //                 content: ''
        //             };
        //             typeObject.id = object.get('id');
        //             typeObject.content = object.get('alias');
        //             content.push(typeObject);
        //         });
        //         this.get('store').findAll('door', {reload: true}).then((objects) =>
        //         {
        //             objects.forEach((object) =>
        //             {
        //                 let typeObject = {
        //                     type: 'doors',
        //                     id: '',
        //                     content: ''
        //                 };
        //                 typeObject.id = object.get('id');
        //                 typeObject.content = object.get('alias');
        //                 content.push(typeObject);
        //             });
        //             this.get('store').findAll('group', {reload: true}).then((objects) =>
        //             {
        //                 objects.forEach((object) =>
        //                 {
        //                     let typeObject = {
        //                         type: 'groups',
        //                         id: '',
        //                         content: ''
        //                     };
        //                     typeObject.id = object.get('id');
        //                     typeObject.content = object.get('name');
        //                     content.push(typeObject);
        //                 });
        //                 this.get('store').findAll('pin-code', {reload: true}).then((objects) =>
        //                 {
        //                     objects.forEach((object) =>
        //                     {
        //                         let typeObject = {
        //                             type: 'pincode',
        //                             id: '',
        //                             content: ''
        //                         };
        //                         typeObject.id = object.get('id');
        //                         typeObject.content = object.get('alias');
        //                         content.push(typeObject);
        //                     });
        //                     this.get('store').findAll('rfid-card', {reload: true}).then((objects) =>
        //                     {
        //                         objects.forEach((object) =>
        //                         {
        //                             let typeObject = {
        //                                 type: 'credentials.rfid_card.title',
        //                                 id: '',
        //                                 content: ''
        //                             };
        //                             typeObject.id = object.get('id');
        //                             typeObject.content = object.get('alias');
        //                             content.push(typeObject);
        //                         });
        //                         this.get('store').findAll('schedule', {reload: true}).then((objects) =>
        //                         {
        //                             objects.forEach((object) =>
        //                             {
        //                                 let typeObject = {
        //                                     type: 'schedules',
        //                                     id: '',
        //                                     content: ''
        //                                 };
        //                                 typeObject.id = object.get('id');
        //                                 typeObject.content = object.get('name');
        //                                 content.push(typeObject);
        //                             });
        //                             content.sort(function(a, b) {
        //                                 return mySortByTypeThenName(a,b);
        //                             });
        //                             this.set('allObjects', content);
        //                         });
        //                     });
        //                 });
        //             });
        //         });
        //     });
        // });
    },
    actions:
        {
            findAll(partialAlias)
            {
                this.get('search').findAllByAlias(partialAlias).then((data) => {
                    console.log(data);
                });
                return this.get('search').findAllByAlias(partialAlias);
            }
        }
});

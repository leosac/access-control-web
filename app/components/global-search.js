import Ember from 'ember';

export default Ember.Component.extend({
    globalInfo: Ember.inject.service('leosac-info'),
    search: Ember.inject.service('search'),
    flashMessages: Ember.inject.service(),
    i18n: Ember.inject.service(),
    store: Ember.inject.service(),

    dataToObject: {},
    allObjects: [],
    selectedObjects: false,
    selectedZone: '',
    selected: null,

    init() {
        this._super(...arguments);
        this.set('selected', null);
    },
    didRender() {
        this.set('selected', null);
    },

    actions:
        {
            /**
             * There is some tricky things happening in this function:
             *
             * First, we have to return an object different to the promise to sort it for example.
             *
             * Then, we have a specificName and name for each elements,
             * because every model has a different name,
             * but we need something clean for the templates.
             *
             * Then, we sort our object by type, and then by name
             *
             * Finally we return this filled and sorted object to ember-power-select-typeahead
             */
            findAll(partialAlias)
            {
                return this.get('search').findAllByAlias(partialAlias).then((data) => {
                    let resultObject = [];

                    data.forEach(function(objects) {
                        let typeObject = {};

                        if (objects.type === 'user')
                        {
                            typeObject = {
                                username: objects.nameOrAlias,
                                name:  objects.nameOrAlias,
                                type: 'typeUser',
                                id: objects.id
                            };
                        }
                        else if (objects.type === 'zone')
                        {
                            typeObject = {
                                alias: objects.nameOrAlias,
                                name:  objects.nameOrAlias,
                                type: 'typeZone',
                                id: objects.id
                            };
                        }
                        else if (objects.type === 'door')
                        {
                            typeObject = {
                                alias: objects.nameOrAlias,
                                name:  objects.nameOrAlias,
                                type: 'typeDoor',
                                id: objects.id
                            };
                        }
                        else if (objects.type === 'schedule')
                        {
                            typeObject = {
                                name: objects.nameOrAlias,
                                type: 'typeSchedule',
                                id: objects.id
                            };
                        }
                        else if (objects.type === 'group')
                        {
                            typeObject = {
                                name:  objects.nameOrAlias,
                                type: 'typeGroup',
                                id: objects.id
                            };
                        }
                        else if (objects.type === 'pin-code')
                        {
                            typeObject = {
                                alias:  objects.nameOrAlias,
                                name:  objects.nameOrAlias,
                                type: 'typePinCode',
                                id: objects.id
                            };
                        }
                        else if (objects.type === 'rfid-card')
                        {
                            typeObject = {
                                alias:  objects.nameOrAlias,
                                name:  objects.nameOrAlias,
                                type: 'typeRfidCard',
                                id: objects.id
                            };
                        }
                        resultObject.push(typeObject);
                    });
                    resultObject.sort(function(a, b) {
                        let typeA = a.type.toLowerCase();
                        let typeB = b.type.toLowerCase();

                        if (typeA === typeB)
                        {
                            let nameA = a.name.toLowerCase();
                            let nameB = b.name.toLowerCase();

                            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                        }
                        return typeA < typeB ? -1 : typeA > typeB ? 1 : 0;
                    });
                    return resultObject;
                });
            }
        }
});

/**
 { groupName: 'user', options: [] },
 { groupName: 'zone.title', options: [] },
 { groupName: 'door.title', options: [] },
 { groupName: 'group.title', options: [] },
 { groupName: 'pincode', options: [] },
 { groupName: 'credentials.rfid_card.title', options: [] },
 { groupName: 'schedule.title', options: [] },
 */
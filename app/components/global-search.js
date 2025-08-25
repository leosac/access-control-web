import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class GlobalSearch extends Component {
    @service('leosac-info')
    globalInfo;

    @service('module-route-helper')
    routeHelper;

    @service
    search;

    @service
    flashMessages;

    @service
    intl;

    @service
    store;

    @service
    router;

    selectedObjects = false;
    selectedZone = '';
    selected = null;

    constructor(owner, args) {
        super(owner, args);
        this.set('selected', null);

        this.dataToObject = this.dataToObject || {};
        this.allObjects = this.allObjects || [];
    }

    didRender() {
        this.set('selected', null);
    }

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
    @action
    findAll(partialAlias) {
        const self = this;
        return this.search.findAllByAlias(partialAlias).then((data) => {
            let resultObject = [];
            data.forEach(function(objects) {
                let typeObject = {};
                if (objects.type === 'user')
                {
                    typeObject = {
                        name:  objects.nameOrAlias,
                        tradKey: 'typeUser',
                        type: 'profile',
                        id: objects.id
                    };
                }
                else if (objects.type === 'zone')
                {
                    typeObject = {
                        name:  objects.nameOrAlias,
                        tradKey: 'typeZone',
                        type: objects.type,
                        id: objects.id
                    };
                }
                else if (objects.type === 'door')
                {
                    typeObject = {
                        name:  objects.nameOrAlias,
                        type: objects.type,
                        tradKey: 'typeDoor',
                        id: objects.id
                    };
                }
                else if (objects.type === 'schedule')
                {
                    typeObject = {
                        name:  objects.nameOrAlias,
                        type: objects.type,
                        tradKey: 'typeSchedule',
                        id: objects.id
                    };
                }
                else if (objects.type === 'group')
                {
                    typeObject = {
                        name:  objects.nameOrAlias,
                        type: objects.type,
                        tradKey: 'typeGroup',
                        id: objects.id
                    };
                }
                else if (objects.type === 'pin-code')
                {
                    typeObject = {
                        name:  objects.nameOrAlias,
                        type: 'credentials.' + objects.type,
                        tradKey: 'typePinCode',
                        id: objects.id
                    };
                }
                else if (objects.type === 'rfid-card')
                {
                    typeObject = {
                        name:  objects.nameOrAlias,
                        type: 'credentials.' + objects.type,
                        tradKey: 'typeRfidCard',
                        id: objects.id
                    };
                }
                else
                {
                    typeObject = {
                        name: objects.nameOrAlias,
                        tradKey: 'device',
                        type: self.get('routeHelper').setPath(objects.type),
                        id: objects.id
                    };
                }
                resultObject.push(typeObject);
            });
            resultObject.sort(function(a, b) {
                let typeA = a.type[0].toLowerCase();
                let typeB = b.type[0].toLowerCase();
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

    @action
    handleRoute(result) {
        this.selected = result;
        this.router.transitionTo(result.type, result.id);
    }
}

/**
 { groupName: 'user', options: [] },
 { groupName: 'zone.title', options: [] },
 { groupName: 'door.title', options: [] },
 { groupName: 'group.title', options: [] },
 { groupName: 'pincode', options: [] },
 { groupName: 'credentials.rfid_card.title', options: [] },
 { groupName: 'schedule.title', options: [] },
 */

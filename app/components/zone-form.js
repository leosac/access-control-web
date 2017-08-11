import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service(),
    flashMessages: Ember.inject.service(),

    newDoor: null,
    newChild:null,
    allType: ['Logical', 'Physical'],
    doorAliasToObject: {},
    allAlias: [],
    selectedAlias: false,
    zone: false,


    actions: {
        addDoor() {
            this.get('store').findRecord('door', this.get('newDoor.id')).then((door) => {
                this.get('zone').get('doors').addObject(door);
            });
        },
        searchDoor(partialName) {
            return this.get('search').findDoorByAlias(partialName);
        },
        removeDoor(door) {
            this.get('zone').get('doors').removeObject(door);
        }

        // We need to add a module that allow us to search children zone, like the door search

        // ,
        // addChild() {
        //     this.get('store').findRecord('children', this.get('newChild.id')).then((children) => {
        //         this.get('zone').get('children').addObject(children);
        //     });
        // },
        // searchChild(partialName) {
        //     return this.get('search').findChildByAlias(partialName);
        // },
        // removeChild(children) {
        //     this.get('zone').get('children').removeObject(children);
        // }


        // addToZone()
        // {
        //     const store = this.get('store');
        //     const fm = this.get('flashMessages');
        //
        //     const door = this.get('doorAliasToObject')[this.get('selectedAlias')];
        //     if (!door)
        //     {
        //         fm.danger('Cannot find this door.');
        //         return;
        //     }
        //
        //     const membership = store.createRecord('door-zone-link');
        //     membership.set('zone', this.get('zone'));
        //     membership.set('door', door);
        //
        //     membership.save().then(() =>
        //         {
        //             fm.success('Successfully added door to zone.');
        //         },
        //         () =>
        //         {
        //             fm.danger('Failed to add door to zone');
        //             membership.deleteRecord();
        //         });
        // }
        // Here, we should add something similar to the thing above.
        // There should be a possibility to add a zone child to a zone parent
    }
});

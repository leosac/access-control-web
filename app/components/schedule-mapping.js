import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),

    // Set the following properties:
    //    + mapping

    newUser: null,
    newGroup: null,
    actions: {
        addUser()
        {
            this.get('mapping').get('users').addObject(this.get('newUser'));
        },
        removeUser(user)
        {
            this.get('mapping').get('users').removeObject(user);
        },
        removeGroup(group)
        {
            this.get('mapping').get('groups').removeObject(group);
        },
        addGroup()
        {
            this.get('store').findRecord('group', this.get('newGroup.id')).then((grp) =>
            {
                this.get('mapping').get('groups').addObject(grp);
            });
        },
        searchGroup(partialName)
        {
            return this.get('search').findGroupByName(partialName);
        },
    }
});

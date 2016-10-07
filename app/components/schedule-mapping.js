import Ember from 'ember';

export default Ember.Component.extend({
    // Set the following properties:
    //    + mapping

    newUser: null,
    actions: {
        addUser()
        {
            this.get('mapping').get('users').addObject(this.get('newUser'));
        },
        removeUser(user)
        {
            this.get('mapping').get('users').removeObject(user);
        }
    }
});

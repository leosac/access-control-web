import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    allUsers: [],
    didReceiveAttrs()
    {
        const self = this;
        this.get('store').findAll('user', {reload: true}).then((users) =>
        {
            self.set('allUsers', users);
        });
    },
});

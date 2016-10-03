import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    allUsers: [],
    didReceiveAttrs()
    {
        this._super(...arguments);
        const self = this;
        this.get('store').findAll('user', {reload: true}).then((users) =>
        {
            if (!(self.get('isDestroyed')))
                self.set('allUsers', users);
        });
    },
});

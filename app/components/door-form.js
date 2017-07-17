import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service(),

    // `action` and `door` must be set.
    actions: {
        changeAP(param)
        {
            const door = this.get('door');
            if (param === null)
            {
                // Clearing AP.
                door.set('accessPoint', null);
            }
            else
            {
                this.get('store').find('access-point', param.id).then((ap) =>
                {
                    door.set('accessPoint', ap);
                });
            }
        }
    },
});

import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service(),
    selectedAccessPoint: {},

    // `action` and `door` must be set.
    actions:
    {
        searchAP(partialName)
        {
            return this.get('search').findAccessPointByAlias(partialName).then((aps) =>
            {
                return aps;
            });
        },
        changeAP(param)
        {
            console.log(this.get('selectedAccessPoint'));
            const door = this.get('door');
            this.get('store').find('access-point', param.id).then((ap) =>
            {
                door.set('accessPoint', ap);
            });
            this.set('selectedAccessPoint', param);
        }
    },
});

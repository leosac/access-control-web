import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),
    allGpio: [],

    init() {
        this._super(...arguments);
    },

    actions: {
        searchGpio(partialName) {
            return this.get('search').findDeviceByAlias(partialName).then((devices) =>  {
                let object = [];
                devices.forEach(function(device) {
                    if (device['device-class'] === 1)
                        object.push(device);
                });
                this.set('allGpio', object);
                // we can sort the object here, not sure by what so it is in stand-by
                return object;
            }, (data) => {

            });
        },
        setGpio(params)
        {
            this.get('store').find(params.type, params.id).then((gpio) => {
                this.get('ledBuzzer').set('gpio', gpio);
            });
        }
    }
});

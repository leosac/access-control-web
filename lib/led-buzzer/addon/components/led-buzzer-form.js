import Ember from 'ember';
import {DeviceClass} from "web/leosac-constant";

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),
    allGpio: [],
    arrayOfDeviceClass: [DeviceClass.gpio],

    init() {
        this._super(...arguments);
    },

    actions: {
    }
});

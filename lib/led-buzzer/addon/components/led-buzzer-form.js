import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { DeviceClass } from "web/leosac-constant";

export default Component.extend({
    search: service('search'),
    store: service('store'),
    allGpio: [],
    arrayOfDeviceClass: [DeviceClass.gpio],

    init() {
        this._super(...arguments);
    },

    actions: {
    }
});

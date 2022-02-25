import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/device-picker';

/**
 *  This will be the doc for this component.
 *
 *
 *
 *
 */

export default Component.extend({
    layout,
    search: service('search'),
    store: service('store'),
    arrayOfDeviceClass: null,               // array that must contain all the device class that you want to search
    device: null,                           // the device that need a relationships
    relationshipsName: null,                // the name of the relationships (eg gpioHigh)
    allDeviceSearch: [],
    lama: null,
    init() {
      this._super(...arguments);
    },
    actions: {
        searchDevice(partialName) {
            let arrayOfDeviceClass = this.get('arrayOfDeviceClass');
            return this.get('search').findDeviceByAlias(partialName).then((devices) => {
                    let object = [];
                    devices.forEach(function(device) {
                        arrayOfDeviceClass.forEach((deviceClass) => {
                            if (device['device-class'] === deviceClass)
                                object.push(device);
                        });
                    });
                    this.set('allDeviceSearch', object);
                    return object;
                },
                () => {
                });
        },
        setRelationships(params) {
            this.get('store').find(params.type, params.id).then((device) => {
                this.get('device').set(this.get('relationshipsName'), device);
            });
        }
    }
});

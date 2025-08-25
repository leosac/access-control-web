import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class DevicePicker extends Component {
    @service
    search;

    @service
    store;

    arrayOfDeviceClass = null;               // array that must contain all the device class that you want to search
    device = null;                           // the device that need a relationships
    relationshipsName = null;                // the name of the relationships (eg gpioHigh)
    lama = null;

    constructor(owner, args) {
        super(owner, args);
        this.allDeviceSearch = this.allDeviceSearch || [];
    }

    @action
    searchDevice(partialName) {
        let arrayOfDeviceClass = this.get('arrayOfDeviceClass');
        return this.search.findDeviceByAlias(partialName).then((devices) => {
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
    }

    @action
    setRelationships(params) {
        this.store.find(params.type, params.id).then((device) => {
            this.get('device').set(this.get('relationshipsName'), device);
        });
    }
}

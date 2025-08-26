import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class DeviceListPicker extends Component {
    @service
    search;
    @service
    store;

    newDevice = null;                        // the newly selected device
    arrayOfDeviceClass = null;               // array that must contain all the device class that you want to search
    device = null;                           // the device that need a relationships
    deviceAction = null;                     // what action to do when selecting a device

    constructor(owner, args) {
        super(owner, args);
        this.allDeviceSearch = this.allDeviceSearch || [];
    }

    @action
    searchDevice(partialName) {
        return this.search.findDeviceByAlias(partialName).then((devices) => {
                let object = [];
                devices.forEach((device) => {
                    this.args.arrayOfDeviceClass.forEach((deviceClass) => {
                        if (device['device-class'] === deviceClass)
                            object.push(device);
                    });
                });
                this.allDeviceSearch = object;
                return object;
            },
            () => {
            });
    }
}

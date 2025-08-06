import { action } from '@ember/object';
import { layout as templateLayout } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/device-list-picker';

@templateLayout(layout)
export default class DeviceListPicker extends Component {
    @service
    search;

    @service
    store;

    newDevice = null;                        // the newly selected device
    arrayOfDeviceClass = null;               // array that must contain all the device class that you want to search
    device = null;                           // the device that need a relationships
    deviceAction = null;                     // what action to do when selecting a device

    init() {
        super.init(...arguments);
        this.allDeviceSearch = this.allDeviceSearch || [];
    }

    @action
    searchDevice(partialName) {
        let arrayOfDeviceClass = this.get('arrayOfDeviceClass');
        return this.search.findDeviceByAlias(partialName).then((devices) => {
                let object = [];
                devices.forEach(function (device) {
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
}

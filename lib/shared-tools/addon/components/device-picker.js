import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class DevicePicker extends Component {
    @service
    search;
    @service
    store;

    constructor(owner, args) {
        super(owner, args);
        this.allDeviceSearch = this.allDeviceSearch || [];
    }

    @action
    searchDevice(partialName) {
        return this.search.findDeviceByAlias(partialName).then((devices) => {
                let object = [];
                devices.forEach(function(device) {
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

    @action
    setRelationships(params) {
        this.store.findRecord(params.type, params.id).then((device) => {
            this.args.device[this.args.relationshipsName] = device;
        });
    }
}

import { service } from '@ember/service';
import Component from '@glimmer/component';
import { DeviceClass } from "web/leosac-constant";

export default class LedBuzzerForm extends Component {
    @service('search')
    search;

    @service('store')
    store;

    form = null;

    constructor(owner, args) {
        super(owner, args);
        this.allGpio = this.allGpio || [];
        this.arrayOfDeviceClass = this.arrayOfDeviceClass || [DeviceClass.gpio];
    }
}

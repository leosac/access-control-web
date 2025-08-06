import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { DeviceClass } from "web/leosac-constant";

export default class LedBuzzerForm extends Component {
    @service('search')
    search;

    @service('store')
    store;

    init() {
        super.init(...arguments);
        this.allGpio = this.allGpio || [];
        this.arrayOfDeviceClass = this.arrayOfDeviceClass || [DeviceClass.gpio];
    }
}

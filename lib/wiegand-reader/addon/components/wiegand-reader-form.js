import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { DeviceClass } from "web/leosac-constant";

export default class WiegandReaderForm extends Component {
    @service('search')
    search;

    @service('store')
    store;

    wiegandReader = false;
    newGpioHigh = null;
    newGpioLow = null;

    constructor(owner, args) {
        super(owner, args);
        // this is needed by the device-picker, this correspond to all the gpio
        this.arrayOfDeviceClassGpio = this.arrayOfDeviceClassGpio || [DeviceClass.gpio];
        // all LED
        this.arrayOfDeviceClassLed = this.arrayOfDeviceClassLed || [DeviceClass.led];
        // all Buzzer
        this.arrayOfDeviceClassBuzzer = this.arrayOfDeviceClassBuzzer || [DeviceClass.buzzer];
        this.allGpio = this.allGpio || [];
        this.allMode = this.allMode || ['wiegand-mode.simple',
            'wiegand-mode.pin_4',
            'wiegand-mode.pin_8',
            'wiegand-mode.pin_buffered',
            'wiegand-mode.card_4',
            'wiegand-mode.card_8',
            'wiegand-mode.card_buffered',
            'wiegand-mode.autodetect'
        ];
    }
}

import Component from '@ember/component';

export default class PifaceDigitalGpioForm extends Component {
    init() {
        super.init(...arguments);
        this.allDirection = this.allDirection || ['in', 'out'];
        this.allValue = this.allValue || [true, false];
    }
}

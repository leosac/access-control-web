import Component from '@glimmer/component';

export default class PifaceDigitalGpioForm extends Component {
    constructor(owner, args) {
        super(owner, args);
        this.allDirection = this.allDirection || ['in', 'out'];
        this.allValue = this.allValue || [true, false];
    }
}

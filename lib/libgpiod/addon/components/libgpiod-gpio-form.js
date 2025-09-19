import Component from '@glimmer/component';

export default class LibgpiodGpioForm extends Component {
    constructor(owner, args) {
        super(owner, args);
        this.allDirection = this.allDirection || ['in', 'out'];
        this.allValue = this.allValue || [true, false];
        this.allInterruptMode = this.allInterruptMode || ['none', 'rising', 'falling', 'both'];
    }
}

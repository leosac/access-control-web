import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class ButtonWithConfirmation extends Component {
    @tracked
    modalOpen = false;

    // #bs-button property
    get size() {
        return this.args.size || 'sm';
    }

    get type() {
        return this.args.type || 'info';
    }

    get icon() {
        return this.args.icon || '';
    }

    // content
    get text() {
        return this.args.text || 'My button';  
    }

    get message() {
        return this.args.message || 'Please confirm or cancel your action.';  
    }

    @action
    spawnModal() {
        this.modalOpen = true;
    }

    @action
    onConfirm() {
        this.modalOpen = false;
        if (this.args.onConfirm)
            this.args.onConfirm();
    }

    @action
    onCancel() {
        this.modalOpen = false;
        if (this.args.onCancel)
            this.args.onCancel();
    }
}

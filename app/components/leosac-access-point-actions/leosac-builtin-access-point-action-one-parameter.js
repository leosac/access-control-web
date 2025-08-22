import Component from '@glimmer/component';

/**
 * You need to provide customAction to that component.
 * customAction is normally autoprovided by the leosac-builtin-access-point-action-params
 *
 */
export default class LeosacBuiltinAccessPointActionOneParameter extends Component {
    customAction = null;

    // This will set the duration to 3000 if there is no duration
    constructor(owner, args) {
        super(owner, args);
        let duration = this.get('customAction.params');

        if (!duration) {
            this.set('customAction.params', 3000);
        }
    }
}

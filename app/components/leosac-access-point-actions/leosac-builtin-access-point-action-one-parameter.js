import classic from 'ember-classic-decorator';
import Component from '@ember/component';

/**
 * You need to provide customAction to that component.
 * customAction is normally autoprovided by the leosac-builtin-access-point-action-params
 *
 */
@classic
export default class LeosacBuiltinAccessPointActionOneParameter extends Component {
    customAction = null;

    // This will set the duration to 3000 if there is no duration
    init() {
        let duration = this.get('customAction.params');

        if (!duration) {
            this.set('customAction.params', 3000);
        }
        super.init(arguments);
    }
}

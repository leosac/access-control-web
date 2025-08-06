import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class MyFooter extends Component {
    @service('leosac-info')
    globalInfo;

    @service('websocket')
    ws;

    init() {
        super.init(...arguments);
    }
}

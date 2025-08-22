import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class MyFooter extends Component {
    @service('leosac-info')
    globalInfo;

    @service('websocket')
    ws;

    constructor(owner, args) {
        super(owner, args);
    }
}

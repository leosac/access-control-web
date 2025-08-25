import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class TopMenu extends Component {
    @service('leosac-info')
    leosacInfo;

    @service('authentication')
    authSrv;

    @service
    flashMessages;

    @action
    logout() {
        "use strict";
        let self = this;
        this.authSrv.logout().then(() =>
        {
            self.sendAction('onLogout');
        });
    }

    @action
    setLocale(loc) {
        this.leosacInfo.setLocale(loc);
    }
}

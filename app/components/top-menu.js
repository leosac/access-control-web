import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
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

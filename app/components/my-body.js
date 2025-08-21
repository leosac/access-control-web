import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class MyBody extends Component {
    @service('authentication')
    authSrv;

    @service('leosac-info')
    globalInfo;

    @service
    flashMessages;
    
    /**
     * Logout event propagation. Currently
     * only the 'index' route is able to handle this event.
     */
    @action
    logout()
    {
        "use strict";
        console.log('LEOSAC_MY_BODY LOGOUT');
        this.sendAction('onLogout');
    }
}

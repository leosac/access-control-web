import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class OptionForm extends Component {
    @service('authentication')
    authSrv;

    @service('leosac-info')
    leosacInfo;

    @service('websocket')
    websocket;

    @service
    store;

    _title = 'settings';

    /**
     * onLogout action name.
     */
    onLogout = 'onLogout';

    language = '';
    newName = '';

    init() {
        super.init(...arguments);
        this.languageOption = this.languageOption || ['Français', 'English'];
        let loc = this.get('leosacInfo').getLocale();

        this.set('newName', this.get('leosacInfo').getNameApp());
        if (loc === 'fr') {
            this.set('language', 'Français');
        } else {
            this.set('language', 'English');
        }
    }

    @action
    restart() {
        this.get('leosacInfo').restart();
    }

    @action
    logout() {
        "use strict";
        let self = this;
        this.get('authSrv').logout().then(() =>
        {
            self.sendAction('onLogout');
        });
    }

    @action
    getNameApp() {
        console.log(this.get('leosacInfo').getNameApp());
    }

    @action
    setNameApp() {
        this.get('leosacInfo').setNameApp(this.get('newName'));
    }

    @action
    changeLanguage(lang) {
        this.set('language', lang);
    }

    @action
    getLocale() {
        if (this.get('leosacInfo').getLocale() === 'fr') {
            return 'Français';
        } else {
            return 'English';
        }
    }

    // It help the ember-power-select component to change the value of the locale variable,
    // then refresh the page because we need to actualize the element of the page
    @action
    setLocale(loc) {
        if (loc === 'Français') {
            this.get('leosacInfo').setLocale('fr');
        } else {
            this.get('leosacInfo').setLocale('en');
        }
        location.reload();
    }
}

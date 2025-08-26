import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

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

    language = '';
    newName = '';

    constructor(owner, args) {
        super(owner, args);
        this.languageOption = this.languageOption || ['Français', 'English'];
        let loc = this.leosacInfo.getLocale();

        this.newName = this.leosacInfo.getNameApp();
        if (loc === 'fr') {
            this.language = 'Français';
        } else {
            this.language = 'English';
        }
    }

    @action
    restart() {
        this.leosacInfo.restart();
    }

    @action
    logout() {
        this.authSrv.logout().then(() =>
        {
            this.sendAction('onLogout');
        });
    }

    @action
    getNameApp() {
        console.log(this.leosacInfo.getNameApp());
    }

    @action
    setNameApp() {
        this.leosacInfo.setNameApp(this.newName);
    }

    @action
    changeLanguage(lang) {
        this.language = lang;
    }

    @action
    getLocale() {
        if (this.leosacInfo.getLocale() === 'fr') {
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
            this.leosacInfo.setLocale('fr');
        } else {
            this.leosacInfo.setLocale('en');
        }
        location.reload();
    }
}

import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class AccessPoint extends Component {
    // Needs the `onChange` and `selected` property set.
    // Also needs the `label` property
    //form property can be detected with form

    // The output of (when something is selected)
    // is a dict {id: ID, alias: "alias"};

    @service
    search;

    form = null;

    @action
    changed(input) {
        this.get('onChange')(input);
    }

    // This is a workaround because allowClear from
    // ember-power-select-typeahead doesn't seems to work.
    @action
    clear() {
        this.set('selected', null);
        this.get('onChange')(null);
    }

    @action
    searchAP(partialAlias) {
        return this.search.findAccessPointByAlias(partialAlias);
    }
}

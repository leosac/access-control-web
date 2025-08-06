import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class ZoneSearch extends Component {
    ignoreZone = null;

    // Needs the `onChange` and `selected` property set.
    // Also needs the `label` property
    //form property can be detected with form

    // The output of (when something is selected)
    // is a dict {id: ID, alias: "alias"};

    @service
    search;

    // This is a workaround because allowClear from
    // ember-power-select-typeahead doesn't seems to work.
    @action
    clear() {
        this.set('selected', null);
    }

    @action
    searchZone(partialAlias) {
        let id = parseInt(this.get('ignoreZone').id);
        let data = this.search.findZoneByAlias(partialAlias);

        data.then(function(res) {
            let currentZoneIndex = -1;
            let count = 0;

            if (res) {
                res.forEach(function (obj) {
                    if (obj.id === id) {
                        currentZoneIndex = count;
                    }
                    count += 1;
                });
            }
            if (currentZoneIndex !== -1) {
                res.splice(currentZoneIndex, 1);
            }
        });
        return data;
    }
}

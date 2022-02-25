import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    ignoreZone: null,
    // Needs the `onChange` and `selected` property set.
    // Also needs the `label` property
    //form property can be detected with form

    // The output of (when something is selected)
    // is a dict {id: ID, alias: "alias"};

    search: service('search'),

    actions:
        {
            // This is a workaround because allowClear from
            // ember-power-select-typeahead doesn't seems to work.
            clear()
            {
                this.set('selected', null);
            },
            searchZone(partialAlias)
            {
                let id = parseInt(this.get('ignoreZone').id);
                let data = this.get('search').findZoneByAlias(partialAlias);

                data.then(function(res) {
                    let currentZoneIndex = -1;
                    let count = 0;

                    if (res) {
                        res.forEach(function (obj) {
                            if (obj.id === id)
                                currentZoneIndex = count;
                            count += 1;
                        });
                    }
                    if (currentZoneIndex !== -1)
                        res.splice(currentZoneIndex, 1);
                });
                return data;
            }
        }
});

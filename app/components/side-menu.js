import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    moduleManager: service('module-manager'),
    init()
    {
      this._super(...arguments);
    },
    didRender()
    {
        "use strict";
        // Trigger JS code for side-menu.
        $('#side-menu').metisMenu();
    }
});

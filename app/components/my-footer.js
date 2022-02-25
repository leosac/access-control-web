import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    globalInfo: service('leosac-info'),
    ws: service('websocket'),

    init() {
        this._super(...arguments);
    },

});

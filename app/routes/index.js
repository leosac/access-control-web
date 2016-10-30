import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: Ember.inject.service('authentication'),
    _title: '',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        this.set('_title', this.get('i18n').t('index.title'));
        this._super();
    },
    model()
    {
        "use strict";
        return {user_id: this.get('authSrv').user_id,
            username: this.get('authSrv').username};
    }
});

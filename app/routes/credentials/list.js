import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
import {
  findAllCredentials
} from 'web/leosac-credential-helper';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'credentials.list.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        return findAllCredentials(this.store);
    }
});

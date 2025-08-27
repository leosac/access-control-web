import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
import {
  findAllCredentials
} from 'web/leosac-credential-helper';

export default class extends LeosacRoute {
    @service
    router;
    @service
    store;
    @service
    flashMessages;

    _title = 'credentials.list.title';
    _requireAuth = true;

    model()
    {
        return findAllCredentials(this.store);
    }
}

import Store, { CacheHandler } from '@ember-data/store';
import RequestManager from '@ember-data/request';
import { LegacyNetworkHandler } from '@ember-data/legacy-compat';
// TODO: We will be able to use Fetch only when Adapters will be migrated to Handlers...
//import Fetch from '@ember-data/request/fetch';

export default class extends Store {
    requestManager = new RequestManager()
    .use([LegacyNetworkHandler])
    .useCache(CacheHandler);
}
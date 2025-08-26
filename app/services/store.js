import Store, { CacheHandler, recordIdentifierFor } from '@ember-data/store';
import {
  buildSchema,
  instantiateRecord,
  modelFor,
  teardownRecord
} from '@ember-data/model';
import RequestManager from '@ember-data/request';
import { 
  adapterFor,
  cleanup,
  LegacyNetworkHandler,
  normalize,
  pushPayload,
  serializeRecord,
  serializerFor,
} from '@ember-data/legacy-compat';
/*import {  
  modelFor,
} from '@warp-drive/schema-record';*/
import { CachePolicy } from '@ember-data/request-utils';
import JSONAPICache from '@ember-data/json-api';
import Fetch from '@ember-data/request/fetch';

export default class extends Store {
    requestManager = new RequestManager()
    .use([LegacyNetworkHandler, Fetch])
    .useCache(CacheHandler);

    lifetimes = new CachePolicy({
        apiCacheHardExpires: 15 * 60 * 1000, // 15 minutes
        apiCacheSoftExpires: 1 * 30 * 1000, // 30 seconds
        constraints: {
        headers: {
            'X-WarpDrive-Expires': true,
            'Cache-Control': true,
            'Expires': true,
        }
        }
    });

    createSchemaService() {
        return buildSchema(this);
    }

    createCache(capabilities) {
        return new JSONAPICache(capabilities);
    }

    instantiateRecord(key, createRecordArgs) {
        return instantiateRecord.call(this, key, createRecordArgs);
    }

    teardownRecord(record) {
        return teardownRecord.call(this, record);
    }

    modelFor(type) {
        return (modelFor.call(this, type)) || super.modelFor(type);
    }

    adapterFor = adapterFor; 
    serializerFor = serializerFor;
    pushPayload = pushPayload;
    normalize = normalize;
    serializeRecord = serializeRecord;

    destroy() {  
        cleanup.call(this);
        super.destroy();
    }
}
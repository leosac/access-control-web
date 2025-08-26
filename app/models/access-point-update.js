import Update from 'web/models/update';
import { belongsTo } from '@ember-data/model';

export default class AccessPointUpdateModel extends Update {
    @belongsTo('access-point', { async: true, polymorphic: true, inverse: null })
    accessPoint;
}

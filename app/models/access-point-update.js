import Update from 'web/models/update';
import { belongsTo } from '@ember-data/model';

export default class AccessPointUpdateModel extends Update {
    @belongsTo('access-point', { polymorphic: true })
    accessPoint;
}

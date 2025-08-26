import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class SystemOverviewRoute extends LeosacRoute {
    _title = 'system-overview.title';
    _requireAuth = true;
}

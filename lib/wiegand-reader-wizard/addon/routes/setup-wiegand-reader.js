import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'wiegand-reader-wizard.title',
    _requireAuth: true,
    intl: service()
});

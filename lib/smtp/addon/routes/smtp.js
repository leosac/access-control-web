import { hash } from 'rsvp';
import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service('module-smtp')
    smtpService;

    _title = 'smtp.title';
    _requireAuth = true;

    model()
    {
        return hash({
            servers: this.smtpService.getServersConfig(),
        });
    }
}

import { service } from '@ember/service';
import { later } from '@ember/runloop';
import LeosacRoute from 'web/leosac-route';

export default class WsErrorRoute extends LeosacRoute {
    @service('authentication')
    authSrv;
    @service
    router;
    _title = 'Error';

    model(params)
    {
        if (params.status_code === 7) // SessionAborted
        {
            this.get('authSrv')._clearAuthentication(true);
            let self = this;

            later((function ()
            {
                self.router.transitionTo('login');
            }), 7000);
            this.replaceWith('ws-error.session-aborted', params);
        }
        else if (params.status_code === 2) // PermissionDenied
        {
            this.replaceWith('ws-error.permission-denied', params);
        }
        else if (params.status_code === 6) // RequestTimeout
        {
            this.replaceWith('ws-error.request-timeout', params);
        }
        else if (params.status_code === 8) // EntityNotFound
        {
            this.replaceWith('ws-error.entity-not-found', params);
        }
        else if (params.status_code === 10) // Unknown Error
        {
            this.replaceWith('ws-error.unknown-error', params);
        }
    }
}

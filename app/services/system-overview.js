import { tracked } from '@glimmer/tracking';
import Service, { service } from '@ember/service';

/**
 * This service collects system information
 * from the Leosac service.
 *
 * May need to be merged with leosac-info service. Not
 * sure what is best for now.
 */
export default class SystemOverviewService extends Service {
    @service('websocket')
    ws;
    @service
    flashMessages;

    @tracked
    instance_name = "";
    @tracked
    config_version = false;
    @tracked
    uptime = false;

    update()
    {
        return this.ws.sendJson('system_overview', {}).then(
            (response) =>
            {
                this.config_version = response.config_version;
                this.instance_name = response.instance_name;
                this.uptime = response.uptime;
            }
        );
    }
}

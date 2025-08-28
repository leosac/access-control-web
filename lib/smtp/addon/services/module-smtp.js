import Service, { service } from '@ember/service';

/**
 * A service to interact with Leosac's SMTP module.
 */
export default class ModuleSmtpService extends Service {
    @service('websocket')
    ws;

    getServersConfig()
    {
        return this.ws.sendJson('module.smtp.getconfig', {}).then((resp) =>
        {
            return resp;
        });
    }

    setServersConfig(cfg)
    {
        return this.ws.sendJson('module.smtp.setconfig', cfg).then(() =>
        {
            return true;
        });
    }

    sendMail(recipients, subject, body)
    {
        return this.ws.sendJson('module.smtp.sendmail', {
            to: recipients,
            subject: subject,
            body: body
        });
    }
}

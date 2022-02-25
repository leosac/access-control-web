import Service, { inject as service } from '@ember/service';

/**
 * A service to interact with Leosac's SMTP module.
 */
export default Service.extend({
    websocket: service('websocket'),

    getServersConfig()
    {
        return this.get('websocket').sendJson('module.smtp.getconfig', {}).then((resp) =>
        {
            return resp;
        });
    },
    setServersConfig(cfg)
    {
        return this.get('websocket').sendJson('module.smtp.setconfig', cfg).then(() =>
        {
            return true;
        });
    },
    sendMail(recipients, subject, body)
    {
        return this.get('websocket').sendJson('module.smtp.sendmail', {
            to: recipients,
            subject: subject,
            body: body
        });
    }

});

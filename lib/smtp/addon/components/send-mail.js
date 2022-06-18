import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    smtp: service('module-smtp'),
    intl: service(),
    flashMessages: service(),
    recipient: '',
    body: 'A simple test email',
    subject: 'Leosac test email',
    isButtonDisabled: false,

    actions: {
        sendTestMail()
        {
            const self = this;

            this.set('isButtonDisabled', true);
            return this.get('smtp').sendMail([this.get('recipient')],
                this.get('subject'),
                this.get('body')).then((resp) =>
            {
                this.set('isButtonDisabled', false);
                if (resp.sent)
                    self.flashMessages.success(this.intl.t('smtp.error.send_success'));
                else
                    self.flashMessages.danger(this.intl.t('smtp.error.send_error'));
            });
        }
    }
});

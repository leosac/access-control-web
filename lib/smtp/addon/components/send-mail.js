import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class SendMail extends Component {
    @service('module-smtp')
    smtp;

    @service
    intl;

    @service
    flashMessages;

    recipient = '';
    body = 'A simple test email';
    subject = 'Leosac test email';
    isButtonDisabled = false;

    @action
    sendTestMail() {
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

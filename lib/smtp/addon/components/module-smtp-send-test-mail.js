import Ember from 'ember';

export default Ember.Component.extend({
    smtp: Ember.inject.service('module-smtp'),
    i18n: Ember.inject.service(),
    recipient: '',
    body: 'A simple test email',
    subject: 'Leosac test email',

    actions: {
        sendTestMail()
        {
            console.log('sending');
            const self = this;
            return this.get('smtp').sendMail([this.get('recipient')],
                this.get('subject'),
                this.get('body')).then((resp) =>
            {
                if (resp.sent)
                    self.get('flashMessages').success(this.get('i18n').t('smtp.error.send_success'));
                else
                    self.get('flashMessages').danger(this.get('i18n').t('smtp.error.send_error'));
            });
        }
    }
});
import Ember from 'ember';

export default Ember.Component.extend({
    smtp: Ember.inject.service('module-smtp'),
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
                    self.get('flashMessages').success('Mail has been sent.');
                else
                    self.get('flashMessages').danger('Error while sending mail.');
            });
        }
    }
});

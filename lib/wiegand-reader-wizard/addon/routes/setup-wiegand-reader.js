import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'wiegand-reader-wizard.title',
    _requireAuth: true,
    i18n: Ember.inject.service()
});

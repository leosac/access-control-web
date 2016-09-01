import Ember from 'ember';
import LeosacRoute from '../leosac-route';

export default LeosacRoute.extend({
    _title: 'Error',
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    renderTemplate(controller, model)
    {
        this.render('error', {model: model});
        if (model.status_code === 7) // SessionAborted
        {
            this.get('authSrv')._clearAuthentication(true);
            var self = this;
            Ember.run.later((function ()
            {
                self.transitionTo('login');
            }), 7000);
            this.render('error.session-aborted', {into: 'error'});
        }
        else if (model.status_code === 2) // PermissionDenied
        {
            this.render('error.permission-denied', {model: model,
            into: 'error'});
        }
        else if (model.status_code === 6) // RequestTimeout
        {
            this.render('error.request-timeout', {into: 'error'});
        }
        else if (model.status_code === 8) // EntityNotFound
        {
            this.render('error.entity-not-found', {model: model,
                into: 'error'});
        }
    }
});

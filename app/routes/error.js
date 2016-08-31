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
        console.log('in RENDER TPL');
        console.log(model);

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
    }
});

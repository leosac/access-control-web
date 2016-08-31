import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function ()
{
    this.route('about');
    this.route('login');
    this.route('system-overview');
    this.route('my-profile');
    this.route('error', {path: '/error/:error_content'}, function ()
    {
        this.route('session-aborted');
        this.route('permission-denied');
    });
});

export default Router;

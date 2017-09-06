import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
    this.route('core');
    this.route('error', {path: '/error/:error_content'}, function ()
    {
        this.route('session-aborted');
        this.route('permission-denied');
        this.route('entity-not-found');
        this.route('request-timeout');
    });
});

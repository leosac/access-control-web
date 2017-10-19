import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
    this.route('wiegand-reader',  {path: '/:wiegand_reader_id'});
    this.route('list', {path: '/'});
    this.route('create');
    this.route('error', {path: '/error/:error_content'}, function ()
    {
        this.route('session-aborted');
        this.route('permission-denied');
        this.route('entity-not-found');
        this.route('request-timeout');
    });
});

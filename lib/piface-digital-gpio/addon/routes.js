import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
    this.route('piface-digital-gpio',  {path: '/:piface_digital_gpio_id'});
    this.route('list');
    this.route('create');
    this.route('error', {path: '/error/:error_content'}, function ()
    {
        this.route('session-aborted');
        this.route('permission-denied');
        this.route('entity-not-found');
        this.route('request-timeout');
    });
});

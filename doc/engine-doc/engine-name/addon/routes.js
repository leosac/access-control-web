import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
    this.route('list');
    this.route('model_name-create');
    this.route('model-name', {path: '/model-name/:id'});
});

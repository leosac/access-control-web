import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
    this.route('list', {path: '/'});
    this.route('buzzer-create');
    this.route('led-create');
    this.route('buzzer', {path: '/buzzer/:buzzer_id'});
    this.route('led', {path: '/led/:led_id'});
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | access point', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let route = this.owner.lookup('route:access-point');
    assert.ok(route);
  });
});
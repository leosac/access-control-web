import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | access points/create', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let route = this.owner.lookup('route:access-points/create');
    assert.ok(route);
  });
});

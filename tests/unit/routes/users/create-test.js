import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/create', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let route = this.owner.lookup('route:users/create');
    assert.ok(route);
  });
});

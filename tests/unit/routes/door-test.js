import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | door', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let route = this.owner.lookup('route:door');
    assert.ok(route);
  });
});

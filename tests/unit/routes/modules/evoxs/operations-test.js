import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | modules/evoxs/operations', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let route = this.owner.lookup('route:modules/evoxs/operations');
    assert.ok(route);
  });
});

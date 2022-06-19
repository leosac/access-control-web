import { module, test } from 'qunit';
import { setupModelTest } from 'ember-qunit';

module('Unit | Model | audit wsapicall event', function(hooks) {
  setupModelTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let model = this.owner.lookup('audit-wsapicall-event');
    assert.ok(!!model);
  });
});

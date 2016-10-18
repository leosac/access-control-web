import { moduleForModel, test } from 'ember-qunit';

moduleForModel('audit-group-event', 'Unit | Model | audit group event', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('group-user-membership-table', 'Integration | Component | group user membership table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{group-user-membership-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#group-user-membership-table}}
      template block text
    {{/group-user-membership-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

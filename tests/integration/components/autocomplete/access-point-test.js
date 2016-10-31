import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('autocomplete/access-point', 'Integration | Component | autocomplete/access point', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{autocomplete/access-point}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#autocomplete/access-point}}
      template block text
    {{/autocomplete/access-point}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

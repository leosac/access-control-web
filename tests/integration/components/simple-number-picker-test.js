import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-number-picker', 'Integration | Component | simple number picker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{simple-number-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#simple-number-picker}}
      template block text
    {{/simple-number-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

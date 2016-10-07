import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flashmessage-as-alert', 'Integration | Component | flashmessage as alert', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{flashmessage-as-alert}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#flashmessage-as-alert}}
      template block text
    {{/flashmessage-as-alert}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

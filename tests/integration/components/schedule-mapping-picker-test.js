import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('schedule-mapping-picker', 'Integration | Component | schedule mapping picker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{schedule-mapping-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#schedule-mapping-picker}}
      template block text
    {{/schedule-mapping-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

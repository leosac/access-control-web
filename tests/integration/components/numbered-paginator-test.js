import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('numbered-paginator', 'Integration | Component | numbered paginator', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{numbered-paginator}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#numbered-paginator}}
      template block text
    {{/numbered-paginator}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

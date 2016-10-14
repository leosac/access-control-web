import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('module-smtp-send-test-mail', 'Integration | Component | module smtp send test mail', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{module-smtp-send-test-mail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#module-smtp-send-test-mail}}
      template block text
    {{/module-smtp-send-test-mail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('super-modal', 'Integration | Component | Super Modal', {
  integration: true
});

test('it has a close button', function(assert) {
  this.set('didCloseModal', false);

  this.set('closeAction', () => {
    this.set('didCloseModal', true);
  });

  this.render(hbs`{{super-modal onClose=(action closeAction)}}`);

  // Modal dialogs aren't where you expect them
  this.$().parent().find('[data-test-selector="modal-close-button"]').click();

  return wait().then(() => {
    let didCloseModal = this.get('didCloseModal');

    assert.ok(didCloseModal, 'modal was closed');
  });
});

test('it closes when "ESC" is pressed', function(assert) {
  this.set('didCloseModal', false);

  this.set('closeAction', () => {
    this.set('didCloseModal', true);
  });

  this.render(hbs`{{super-modal onClose=(action closeAction)}}`);

  this.$().trigger({
    type: 'keyup',
    which: 27,
    keyCode: 27,
  });

  return wait().then(() => {
    let didCloseModal = this.get('didCloseModal');

    assert.ok(didCloseModal, 'modal was closed');
  });
});

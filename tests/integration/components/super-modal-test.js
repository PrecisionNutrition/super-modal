import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | Super Modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it has a close button', async function(assert) {
    this.set('didCloseModal', false);

    this.set('closeAction', () => {
      this.set('didCloseModal', true);
    });

    await render(hbs`<SuperModal @onClose={{action closeAction}} />`);

    // Modal dialogs aren't where you expect them
    await click('[data-test-selector="modal-close-button"]');

    let didCloseModal = this.get('didCloseModal');

    assert.ok(didCloseModal, 'modal was closed');
  });

  test('it closes when "ESC" is pressed', async function(assert) {
    this.set('didCloseModal', false);

    this.set('closeAction', () => {
      this.set('didCloseModal', true);
    });

    await render(hbs`<SuperModal @onClose={{action closeAction}} />`);

    await triggerKeyEvent(document, 'keyup', 'Escape');

    let didCloseModal = this.get('didCloseModal');

    assert.ok(didCloseModal, 'modal was closed');
  });
});

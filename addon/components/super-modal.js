import Ember from 'ember';
import layout from '../templates/components/super-modal';

const {
  $,
  Component,
} = Ember;

export default Component.extend({
  layout,

  classNames: [
    'SuperModal',
  ],

  classNameBindings: ['modifierClassName'],

  didInsertElement() {
    this._super(...arguments);

    $('body').on('keyup.modal-dialog', (e) => {
      if (e.keyCode === 27) {
        this.sendAction('onClose');
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    $('body').off('keyup.modal-dialog');
  },
});

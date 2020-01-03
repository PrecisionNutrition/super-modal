import Component from '@ember/component';

import { action } from '@ember/object';

import layout from '../templates/components/super-modal';

export default class SuperModal extends Component {
  layout = layout;

  annotateBodyTag() {
    document.body.classList.add('modal-is-open');
  }

  removeBodyTagAnnotation() {
    document.body.classList.remove('modal-is-open');
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    this.annotateBodyTag();

    this.listener = (event) => {
      let { key } = event;

      if (key === 'Escape') {
        this.send('closeModal', event);
      }
    };

    document.addEventListener('keyup', this.listener);
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);

    this.removeBodyTagAnnotation();

    document.removeEventListener('keyup', this.listener);
  }

  @action
  closeModal() {
    this.removeBodyTagAnnotation();
    this.onClose(...arguments);
  }
}

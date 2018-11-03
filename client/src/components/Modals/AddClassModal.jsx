import React, { Component } from 'react';
import ModalWrapper from './ModalWrapper';

class AddClassModal extends Component {
  render() {
    return (
      <ModalWrapper title="Add a Class">
        <form>
          <input type="text" placeholder="Class Name" className="class-name" />
        </form>
      </ModalWrapper>
    );
  }
}

export default AddClassModal;

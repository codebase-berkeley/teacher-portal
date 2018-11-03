import React, { Component } from 'react';
import ModalWrapper from './ModalWrapper';

class AddUnitModal extends Component {
  render() {
    return (
      <ModalWrapper title="Add a Unit" width={400} showOk={false}>
        <form>
          <input type="text" placeholder="Unit Name" className="unit-name" />
        </form>
      </ModalWrapper>
    );
  }
}

export default AddUnitModal;

import React, { Component } from 'react';
import ModalWrapper from './ModalWrapper';

class AddLessonModal extends Component {
  render() {
    return (
      <ModalWrapper title="Add a Lesson" width={400} showOk={false}>
        <form>
          <input type="text" placeholder="Lesson Name" className="class-name" />
        </form>
      </ModalWrapper>
    );
  }
}

export default AddLessonModal;

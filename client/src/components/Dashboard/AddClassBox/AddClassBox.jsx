import React, { Component } from 'react';
import './AddClassBox.css';
import Modal from 'react-modal';
import StudentModal from './Modal/StudentModal';

class AddClassBox extends Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { modalIsOpen } = this.state;
    return (
      <div className="classbox">
        <div className="grey-top">
          <Modal
            className="class-modal"
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <div className="modalTitle">Add New Class</div>
            <form>
              <br />
              <input
                className="inputText"
                placeholder="Add Class"
                type="text"
              />
              <StudentModal
                className="cancel-student"
                type="submit"
                value="OK"
              />
            </form>
            <button
              type="submit"
              className="cancel-class"
              onClick={this.closeModal}
              close
            >
              Cancel
            </button>
          </Modal>
        </div>
        <button
          className="add-new-class"
          type="submit"
          onClick={this.openModal}
          unitName="+ Add New Unit"
          buttonType="add"
        >
          + Add New Class
        </button>
      </div>
    );
  }
}
export default AddClassBox;

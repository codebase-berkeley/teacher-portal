import React, { Component } from 'react';
import './AddClassBox.css';
import Modal from 'react-modal';
import StudentModal from '../../Modal/StudentModal';
import plus from './plusImage.png';

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
        <div className="grey-top" />
        <img src={plus} className="plus-img" alt="plus" />
        <button
          className="add-new"
          type="submit"
          onClick={this.openModal}
          unitName="+ Add New Unit"
          buttonType="add"
        >
          + Add New Class
        </button>
        <Modal
          className="modal"
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <div className="modalTitle">Add New Class</div>
          <form>
            Class Name
            <br />
            <input className="inputText" type="text" />
            <StudentModal
              className="cancel"
              type="submit"
              value="OK"
              closeExtra={this.closeModal}
            />
          </form>
          <button
            type="submit"
            className="cancel"
            onClick={this.closeModal}
            close
          >
            Cancel
          </button>
        </Modal>
        ;
      </div>
    );
  }
}

export default AddClassBox;

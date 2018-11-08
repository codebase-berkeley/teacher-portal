import React, { Component } from 'react';
import './Modal.css';
import ReactModal from 'react-modal';

import Item from './Item';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

class Modal extends Component {
  constructor() {
    super();

    this.state = { modalIsOpen: false, currItem: '', items: [] };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleItem = this.handleItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleItem(event) {
    this.setState({
      currItem: event.target.value
    });
  }

  addItem() {
    const { currItem, items } = this.state;
    if (currItem !== '') {
      this.setState({
        currItem: ''
      });
      if (currItem.indexOf(',') !== 0) {
        this.setState({
          items: items.concat(currItem.split(','))
        });
      } else {
        this.setState({
          items: items.concat(currItem)
        });
      }
    }
  }

  checkSubmit(e) {
    if (e && e.charCode === 13) {
      this.addItem();
    }
  }

  render() {
    const { modalIsOpen, currItem, items } = this.state;
    return (
      <div>
        <button className="modal-button" type="button" onClick={this.openModal}>
          Open Modal
        </button>
        <ReactModal
          className="modal"
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h1 className="modalTitle">Add Students</h1>
          <div className="todo-container">
            <div className="input-container">
              <input
                onKeyPress={this.checkSubmit}
                className="inputText"
                placeholder="Add Student Email"
                value={currItem}
                onChange={this.handleItem}
              />
            </div>

            <ul className="display">
              {items.map(item => (
                <Item text={item} />
              ))}
            </ul>
            <button className="cancel" type="button" onClick={this.closeModal}>
              Back
            </button>
            <button className="cancel" type="button" onClick={this.closeModal}>
              OK
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;

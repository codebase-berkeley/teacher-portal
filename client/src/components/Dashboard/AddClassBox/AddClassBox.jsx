import React, { Component } from 'react';
import './AddClassBox.css';
import Modal from 'react-modal';
import Item from './Modal/Item';

class AddClassBox extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      currItem: '',
      items: [],
      classModalType: true
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleItem = this.handleItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
    this.classChangeModal = this.classChangeModal.bind(this);
    this.studentsChangeModal = this.studentsChangeModal.bind(this);
  }

  classChangeModal() {
    this.setState(prevState => ({
      classModalType: !prevState.classModalType
    }));
  }

  studentsChangeModal() {
    this.setState(prevState => ({
      classModalType: !prevState.classModalType,
      modalIsOpen: !prevState.modalIsOpen
    }));
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
    const { modalIsOpen, currItem, items, classModalType } = this.state;

    if (classModalType) {
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
              <div className="class-modalTitle">Add New Class</div>
              <form>
                <label htmlFor="className">Class Name</label>
                <input className="inputText" type="text" id="classNameText" />
              </form>
              <div className="button-wrapper">
                <button
                  type="submit"
                  className="cancel-class"
                  onClick={this.closeModal}
                  close
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cancel-class"
                  onClick={this.classChangeModal}
                  close
                >
                  Next
                </button>
              </div>
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
    return (
      <div className="classbox">
        <div className="grey-top">
          <Modal
            className="student-modal"
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <h1 className="student-modalTitle">Add Students</h1>
            <div className="todo-container">
              <div className="input-container">
                <input
                  onKeyPress={this.checkSubmit}
                  className="inputText"
                  placeholder="ie. johndoe@gmail.com"
                  value={currItem}
                  onChange={this.handleItem}
                />
              </div>

              <ul className="display">
                {items.map(item => (
                  <Item text={item} />
                ))}
              </ul>
              <div className="button-wrapper">
                <button
                  className="cancel-student"
                  type="button"
                  onClick={this.classChangeModal}
                >
                  Back
                </button>
                <button
                  className="cancel-student"
                  type="button"
                  onClick={this.studentsChangeModal}
                >
                  OK
                </button>
              </div>
            </div>
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

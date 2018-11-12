import React, { Component } from 'react';
import './AddClassBox.css';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Item from './Modal/Item';

class AddClassBox extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      currItem: '',
      items: [],
      classModalType: true,
      className: ''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleItem = this.handleItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
    this.classChangeModal = this.classChangeModal.bind(this);
    this.studentsChangeModal = this.studentsChangeModal.bind(this);
    this.saveClass = this.saveClass.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.checkRepeat = this.checkRepeat.bind(this);
  }

  checkRepeat(check) {
    const { classList } = this.props;
    let repeated = false;
    for (let i = 0; i < classList.length; i += 1) {
      if (classList[i].class_name === check) {
        repeated = true;
      }
    }
    if (repeated) {
      alert('This name has already been used.');
    } else if (check === '') {
      alert('Please enter a class name.');
    } else {
      this.classChangeModal();
    }
    this.saveClass();
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

  saveClass() {
    const x = document.getElementById('classNameText').value;
    this.setState({ className: x });
  }

  submitInfo() {
    const { className, items } = this.state;
    const { reRender } = this.props;
    fetch('/api/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        className,
        teacherID: 1,
        emails: items
      })
    }).then(
      response => {
        if (response.ok) {
          reRender();
          this.setState({ items: [] });
          return response;
        }
        throw new Error('Request failed!');
      },
      networkError => console.log(networkError.message)
    );
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
    const { currItem, items } = this.state;
    let same = true;
    let valid = false;
    for (let i = 0; i < items.length; i += 1) {
      if (currItem === items[i]) {
        same = false;
      }
    }
    for (let j = 0; j < currItem.length; j += 1) {
      if (currItem.substring(j, j + 1) === '@') {
        valid = true;
      }
    }
    if (e && e.charCode === 13) {
      if (valid && same) {
        this.addItem();
      } else if (!valid) {
        alert('Not a valid email address.');
        if (currItem !== '') {
          this.setState({
            currItem: ''
          });
        }
      } else if (!same) {
        alert('This email address has already been added.');
        if (currItem !== '') {
          this.setState({
            currItem: ''
          });
        }
      }
    }
  }

  render() {
    const {
      modalIsOpen,
      currItem,
      items,
      classModalType,
      className
    } = this.state;

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
                <input
                  className="inputText"
                  type="text"
                  id="classNameText"
                  default={className}
                />
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
                  onClick={() => {
                    const check = document.getElementById('classNameText')
                      .value;
                    this.checkRepeat(check);
                  }}
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
                  onClick={() => {
                    if (items.length > 0) {
                      this.studentsChangeModal();
                      this.submitInfo();
                    } else {
                      alert(
                        'Please add student emails in order to create a class.'
                      );
                    }
                  }}
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

AddClassBox.propTypes = {
  reRender: PropTypes.func.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default AddClassBox;

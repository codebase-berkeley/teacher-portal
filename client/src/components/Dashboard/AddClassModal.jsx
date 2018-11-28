/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import './AddClassBox/AddClassBox.css';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Item from './AddClassBox/Item';

const enterKey = 13;

class AddClassModal extends Component {
  constructor(props) {
    super(props);
    const { showModal } = this.props;
    this.state = {
      modalIsOpen: showModal,
      currEmailItem: '',
      currYearItem: '',
      items: [],
      classModalType: false,
      className: ''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleItem = this.handleItem.bind(this);
    this.handleYearItem = this.handleYearItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
    this.checkYearEnter = this.checkYearEnter.bind(this);
    this.classChangeModal = this.classChangeModal.bind(this);
    this.studentsChangeModal = this.studentsChangeModal.bind(this);
    this.saveClass = this.saveClass.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.checkRepeat = this.checkRepeat.bind(this);
    // this.goToNextModal = this.goToNextModal.bind(this);
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
    const { items, currYearItem } = this.state;
    const { reRender, className } = this.props;

    fetch('/api/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        className,
        teacherID: 1,
        emails: items,
        yearName: currYearItem
      })
    }).then(
      response => {
        if (response.ok) {
          reRender();
          this.setState({ items: [], modalIsOpen: false });
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
      currEmailItem: event.target.value
    });
  }

  handleYearItem(event) {
    this.setState({
      currYearItem: event.target.value
    });
  }

  addItem() {
    const { currEmailItem, items } = this.state;
    if (currEmailItem !== '') {
      this.setState({
        currEmailItem: ''
      });
      if (currEmailItem.indexOf(',') !== 0) {
        this.setState({
          items: items.concat(currEmailItem.split(','))
        });
      } else {
        this.setState({
          items: items.concat(currEmailItem)
        });
      }
    }
  }

  checkYearEnter(e) {
    const { currYearItem } = this.state;
    if (e && e.charCode === enterKey) {
      if (currYearItem === '') {
        alert('Please enter a year');
      }
    }
  }

  checkSubmit(e) {
    const { currEmailItem, items } = this.state;
    let same = true;
    let valid = false;

    for (let i = 0; i < items.length; i += 1) {
      if (currEmailItem === items[i]) {
        same = false;
      }
    }

    for (let j = 0; j < currEmailItem.length; j += 1) {
      if (currEmailItem.substring(j, j + 1) === '@') {
        valid = true;
      }
    }

    if (e && e.charCode === enterKey) {
      if (valid && same) {
        this.addItem();
      } else if (!valid) {
        alert('Not a valid email address.');
        if (currEmailItem !== '') {
          this.setState({
            currEmailItem: ''
          });
        }
      } else if (!same) {
        alert('This email address has already been added.');
        if (currEmailItem !== '') {
          this.setState({
            currEmailItem: ''
          });
        }
      }
    }
  }

  goToNextModal(event) {
    if (event.charCode === enterKey) {
      event.preventDefault();
      this.checkRepeat(document.getElementById('classNameText'));
    }
  }

  render() {
    const { currEmailItem, currYearItem, items, classModalType } = this.state;
    const { className } = this.props;
    const { modalIsOpen } = this.state;

    const h1str = `Add Students to ${className}`;
    return (
      <Modal
        className="student-modal"
        isOpen={modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h1 className="student-modalTitle">{h1str}</h1>
        <div className="todo-container">
          <div className="input-container">
            <input
              onKeyPress={this.checkSubmit}
              className="inputText"
              placeholder="ie. johndoe@gmail.com"
              value={currEmailItem}
              onChange={this.handleItem}
            />
          </div>

          <ul className="display">
            {items.map(item => (
              <Item text={item} />
            ))}
          </ul>

          <h3 className="forclassyear">For class year: </h3>

          <div className="input-container">
            <input
              onKeyPress={this.checkYearEnter}
              className="inputTextYear"
              placeholder="ie. 2018-2019"
              value={currYearItem}
              onChange={this.handleYearItem}
            />
          </div>

          <div className="button-wrapper">
            <button
              className="cancel-student"
              type="button"
              onClick={this.closeModal}
            >
              Cancel
            </button>
            <button
              className="cancel-student marginFix"
              type="button"
              onClick={() => {
                if (currYearItem === '') {
                  alert('Please enter a year');
                } else if (items.length > 0) {
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
    );
  }
}

AddClassModal.propTypes = {
  reRender: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string).isRequired,
  showModal: PropTypes.bool.isRequired
};
export default AddClassModal;

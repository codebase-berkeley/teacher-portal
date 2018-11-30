/* eslint-disable react/no-did-update-set-state */

import React, { Component } from 'react';
import './AddClassBox/AddClassBox.css';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Item from './AddClassBox/Item';

const enterKey = 13;

function validateEmail(email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class AddClassModal extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      currEmailItem: '',
      currYearItem: '',
      items: []
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleItem = this.handleItem.bind(this);
    this.handleYearItem = this.handleYearItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
    this.checkYearEnter = this.checkYearEnter.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.checkRepeat = this.checkRepeat.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { showModal } = this.props;
    if (showModal !== prevProps.showModal) {
      this.setState({ modalIsOpen: showModal });
    }
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
    }
  }

  submitInfo() {
    const { items, currYearItem } = this.state;
    const { className } = this.props;

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
          this.setState({ items: [], modalIsOpen: false });
          this.closeModal();
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
    const { handleChangeState } = this.props;
    this.setState({ modalIsOpen: false, items: [] });
    handleChangeState(); // changes the state in parent component
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

    for (let i = 0; i < items.length; i += 1) {
      if (currEmailItem === items[i]) {
        same = false;
      }
    }

    if (e && e.charCode === enterKey) {
      const valid = validateEmail(currEmailItem);
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
    const { currEmailItem, currYearItem, items } = this.state;
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
  className: PropTypes.string.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string).isRequired,
  showModal: PropTypes.bool.isRequired,
  handleChangeState: PropTypes.func.isRequired
};
export default AddClassModal;

import React, { Component } from 'react';
import Modal from 'react-modal';
import './ClassBox.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AddClassModal from '../AddClassModal';

const enterKey = 13;

function validateEmail(email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class ClassBox extends Component {
  static propTypes = {
    reRender: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      currEmailItem: '',
      currYearItem: '',
      items: [],
      classModalType: true,
      className: '',
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
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
    this.goToNextModal = this.goToNextModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
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
    const { className, items, currYearItem } = this.state;
    const { reRender } = this.props;
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

  deleteClass() {
    const { title, reRender } = this.props;
    fetch(`/api/deleteClass/${encodeURIComponent(title)}`, {
      method: 'delete'
    }).then(response => {
      if (response.ok) {
        reRender();
        return response.json();
      }
      throw new Error('Request Failed');
    });
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

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleChangeState() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    const { color, title, teacher, id, isTeacher } = this.props;
    const { showModal, modalIsOpen } = this.state;
    const route = `/units/${id}`;

    return (
      <div className="class-container">
        <div className="confirmation">
          <Modal
            className="confirm-pop-up"
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <h1 className="confirm-message">
              Are you sure you want to delete this class?
            </h1>
            <h5 className="sub-message">
              Deleting this class will delete all information associated with
              it.
            </h5>
            <div className="button-wrapper">
              <button
                type="submit"
                className="cancel"
                onClick={this.closeModal}
                close
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cancel marginFix"
                onClick={this.deleteClass}
              >
                Delete
              </button>
            </div>
          </Modal>
        </div>


        {isTeacher ? (
          <button
            type="button"
            className="add-new-students"
            onClick={this.handleShowModal}
          >
            +&nbsp;&nbsp;Add New Students
          </button>
        ) : null}

        {isTeacher ? (
          <button className="class-exit" type="button" onClick={this.openModal}>
            &#10006;
          </button>
        ) : null}

        <NavLink className="classbox" to={route}>
          <div className={color} />
          <p className="title-p">{title}</p>
          <p className="teacher-p">{teacher}</p>
        </NavLink>
        {isTeacher ? (
          <AddClassModal
            showModal={showModal}
            reRender={this.componentWillMount}
            className={title}
            handleChangeState={this.handleChangeState}
          />
        ) : null}
      </div>
    );
  }
}

ClassBox.propTypes = {
  reRender: PropTypes.func.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string).isRequired,
  isTeacher: PropTypes.bool.isRequired
};

export default ClassBox;

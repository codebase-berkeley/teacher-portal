import React, { Component } from 'react';
import './ClassBox.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AddClassModal from '../AddClassModal';

const enterKey = 13;

class ClassBox extends Component {
  static propTypes = {
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

  handleShowModal() {
    this.setState({ showModal: true });
    console.log('handle show modal');
  }

  render() {
    const { color, title, teacher, id } = this.props;
    const { showModal } = this.state;
    const route = `/units/${id}`;

    return (
      <div className="classbox-container">
        <button
          type="button"
          className="add-new-students"
          onClick={this.handleShowModal}
        >
          + Add New Students
        </button>
        <NavLink className="classbox" to={route}>
          <div className={color} />
          <p className="title-p">{title}</p>
          <p className="teacher-p">{teacher}</p>
        </NavLink>
        <AddClassModal
          showModal={showModal}
          reRender={this.componentWillMount}
          className={title}
        />
      </div>
    );
  }
}

ClassBox.propTypes = {
  reRender: PropTypes.func.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ClassBox;

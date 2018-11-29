import React, { Component } from 'react';
import Modal from 'react-modal';
import './ClassBox.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

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
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
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

  render() {
    const { color, title, teacher, id } = this.props;
    const { modalIsOpen } = this.state;
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
            <div className="confirm-message">YOU FUCKING SURE???</div>
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
        <button className="exit" type="button" onClick={this.openModal}>
          &#10005;
        </button>
        <NavLink className="classbox" to={route}>
          <div className={color} />
          <p className="title-p">{title}</p>
          <p className="teacher-p">{teacher}</p>
        </NavLink>
      </div>
    );
  }
}

export default ClassBox;

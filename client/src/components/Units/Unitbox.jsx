import React, { Component } from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Unitbox.css';

class Unitbox extends Component {
  static propTypes = {
    reRender: PropTypes.func.isRequired,
    unitName: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isTeacher: PropTypes.bool.isRequired
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
    const { unitName, reRender } = this.props;
    fetch(`/api/deleteUnit/${encodeURIComponent(unitName)}`, {
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
    const { unitName, path, id, isTeacher } = this.props;
    const { modalIsOpen } = this.state;
    const route = `${path}/${id}`;

    return (
      <div className="bars">
        <div className="box">
          <div className="confirmation">
            <Modal
              className="confirm-pop-up"
              isOpen={modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal"
            >
              <h1 className="confirm-message">
                Are you sure you want to delete this unit?
              </h1>
              <h5 className="sub-message">
                Deleting this unit will delete all information associated with
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
        </div>
        {isTeacher ? (
          <button className="unit-exit" type="button" onClick={this.openModal}>
            &#10005;
          </button>
        ) : null}

        <NavLink to={route} className="unitbox">
          <div>{unitName}</div>
        </NavLink>
      </div>
    );
  }
}

export default Unitbox;

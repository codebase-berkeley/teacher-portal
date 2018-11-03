import React, { Component } from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import Unitbox from './Unitbox';
import './Units.css';

let unitBoxes = [];

function create(unitNames) {
  unitBoxes = [];

  for (let i = 0; i < unitNames.length; i += 1) {
    unitBoxes.push(
      <Unitbox
        unitName={unitNames[i].unit_name}
        path="/lessons"
        buttonType="link"
      />
    );
  }
  return unitBoxes;
}

class Units extends Component {
  constructor() {
    super();
    this.state = {
      unitList: []
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentWillMount() {
    const units = await fetch('/api/units/1');
    const unitsJSON = await units.json();
    this.setState({
      unitList: unitsJSON
    });
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
    const { unitList } = this.state;
    const { modalIsOpen } = this.state;

    return (
      <div className="Page-layout">
        <NavLink to="/" className="ReturnArrow">
          &#8592; Return to Classes
        </NavLink>
        <h2 className="Unit-header">My Units</h2>
        <div>
          <button
            className="addButton"
            type="submit"
            onClick={this.openModal}
            unitName="+ Add New Unit"
            buttonType="add"
          >
            + Add New Unit
          </button>
          {create(unitList)}
          <Modal
            className="modal"
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <div className="modalTitle">Add New Unit</div>
            <form>
              Unit Name <br />
              <input className="inputText" type="text" />
              <input className="cancel ok" type="submit" value="OK" />
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
        </div>
      </div>
    );
  }
}

export default Units;

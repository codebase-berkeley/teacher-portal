import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        key={unitNames[i].id}
        path="/lessons"
        buttonType="link"
      />
    );
  }
  return unitBoxes;
}

class Units extends Component {
  static propTypes = {
    match: PropTypes.string
  };

  static defaultProps = {
    match: {}
  };

  constructor() {
    super();
    this.state = {
      unitList: []
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendData = this.sendData.bind(this);
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

  sendData() {
    const { match } = this.props;
    const { classID } = match.params;
    console.log(classID);
    const unitName = document.getElementById('unit_name').value;
    console.log(unitName);
    fetch('/api/units', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ unit_name: unitName, classid: classID })
    }).then(
      response => {
        if (response.ok) {
          return response;
        }
        throw new Error('Request failed!');
      },
      networkError => console.log(networkError.message)
    );
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
            className="newUnitModal"
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <div className="modalTitle">Add New Unit</div>
            <form action="/units" method="post">
              <label htmlFor="unitname" id="unitname">
                Unit Name
              </label>
              <input className="inputText" id="unit_name" type="text" />
            </form>
            <div className="buttonwrapper">
              <button
                type="submit"
                className="cancelButton"
                onClick={this.closeModal}
                close
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cancelButton"
                onClick={() => {
                  this.sendData();
                  this.closeModal();
                }}
                close
              >
                OK
              </button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Units;

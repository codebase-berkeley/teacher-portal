import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Logout from '../Logout/Logout';
import Unitbox from './Unitbox';
import './Units.css';
import InputBox from './InputBox/InputBox';

class Units extends Component {
  static propTypes = {
    match: PropTypes.string.isRequired,
    history: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      questions: [<InputBox keynumber="1" input="" />],
      unitList: [],
      unitModalType: true,
      unitName: ''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendData = this.sendData.bind(this);
    this.create = this.create.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.unitChangeModal = this.unitChangeModal.bind(this);
    this.generateInputBox = this.generateInputBox.bind(this);
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.saveUnitName = this.saveUnitName.bind(this);
  }

  async componentWillMount() {
    const { match } = this.props;
    const { classID } = match.params;
    const units = await fetch(`/api/units/${classID}`);
    const unitsJSON = await units.json();
    this.setState({
      unitList: unitsJSON
    });
  }

  generateInputBox(questions) {
    this.inputList = [];
    for (let i = 0; i < questions.length; i += 1) {
      this.inputList.push(questions[i]);
    }
    return this.inputList;
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

  addNewQuestion() {
    const { questions } = this.state;
    this.setState({
      questions: questions.concat(
        <InputBox
          keynumber={questions.length + 1}
          input={document.getElementById('question_name')}
        />
      )
    });
  }

  saveUnitName() {
    const { unitName } = this.state;
    this.setState({
      unitName: unitName + document.getElementById('unit_name').value
    });
  }

  sendData() {
    const { match } = this.props;
    const { classID } = match.params;
    const { unitList, unitName } = this.state;
    fetch('/api/units', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ unit_name: unitName, classid: classID })
    }).then(
      response => {
        if (response.ok) {
          this.setState({
            unitList: unitList.concat({
              classid: classID,
              unit_name: unitName
            })
          });
          return response;
        }
        throw new Error('Request failed!');
      },
      networkError => console.log(networkError.message)
    );
  }

  unitChangeModal() {
    this.setState(prevState => ({
      unitModalType: !prevState.unitModalType
    }));
  }

  create(unitNames) {
    this.unitBoxes = [];
    for (let i = 0; i < unitNames.length; i += 1) {
      this.unitBoxes.push(
        <Unitbox
          unitName={unitNames[i].unit_name}
          key={unitNames[i].id}
          id={unitNames[i].id}
          path="/lessons"
          buttonType="link"
        />
      );
    }
    return this.unitBoxes;
  }

  handleGoBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      unitList,
      modalIsOpen,
      unitModalType,
      questions,
      unitName
    } = this.state;
    if (unitModalType) {
      return (
        <div className="Page-layout">
          <Logout />
          <button
            type="button"
            className="ReturnArrow shiftRight"
            onClick={this.handleGoBack}
          >
            &#8592; Return to Classes
          </button>
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
            {this.create(unitList)}
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
                    this.saveUnitName(unitName);
                    this.unitChangeModal();
                  }}
                >
                  Next
                </button>
              </div>
            </Modal>
          </div>
        </div>
      );
    }
    return (
      <div className="Page-layout">
        <Logout />
        <button
          type="button"
          className="ReturnArrow shiftRight"
          onClick={this.handleGoBack}
        >
          &#8592; Return to Classes
        </button>
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
          {this.create(unitList)}
          <Modal
            className="newUnitModal Expand"
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <div className="modalTitle">Add Survey Questions</div>
            <div className="question-wrapper">
              {this.generateInputBox(questions)}
              <div className="addButtonWrapper">
                <button
                  className="cancelButton center"
                  type="button"
                  onClick={this.addNewQuestion}
                >
                  Add New Question
                </button>
              </div>
            </div>
            <div className="buttonwrapper">
              <button
                type="submit"
                className="cancelButton"
                onClick={this.unitChangeModal}
                close
              >
                Back
              </button>
              <button
                type="submit"
                className="cancelButton"
                onClick={() => {
                  this.sendData();
                  this.closeModal();
                }}
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

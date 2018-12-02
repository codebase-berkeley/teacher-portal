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
      questions: [],
      unitList: [],
      unitModalType: true,
      unitName: '',
      isTeacher: false,
      unitID: 0,
      questionInputs: {}
    };
    this.inputText = React.createRef();
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
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  async componentWillMount() {
    const { match } = this.props;
    const { classID } = match.params;
    const units = await fetch(`/api/units/${classID}`, {
      redirected: 'follow'
    });

    if (units.ok) {
      const unitsJSON = await units.json();
      this.setState({
        unitList: unitsJSON.query,
        isTeacher: unitsJSON.is_teacher
      });
    }
  }

  handleQuestionInput(questionID, input) {
    const { questionInputs } = this.state;
    questionInputs[questionID] = input;
    this.setState({
      questionInputs
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
    this.setState({
      modalIsOpen: false,
      unitModalType: true,
      questions: [],
      questionInputs: {},
      unitName: ''
    });
  }

  addNewQuestion() {
    const { questions } = this.state;
    const questionID = questions.length + 1;
    this.setState({
      questions: questions.concat(
        <InputBox id={questionID} handler={this.handleQuestionInput} />
      )
    });
  }

  saveUnitName() {
    const { unitName } = this.state;
    this.setState({
      unitName: unitName + this.inputText.current.value
    });
    if (this.inputText.current.value === '') {
      alert('Please enter a unit name.');
    }
  }

  async sendData() {
    const { match } = this.props;
    const { classID } = match.params;
    const { unitList, unitName, questionInputs, questions } = this.state;
    await fetch('/api/units', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ classID, unitName })
    })
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        },
        networkError => console.log(networkError.message)
      )
      .then(jsonResponse => {
        const { id } = jsonResponse;
        this.setState({
          unitID: id,
          unitList: unitList.concat({
            classID,
            id,
            unit_name: unitName
          })
        });
      });
    const { unitID: idForUnit } = this.state;
    for (let i = 1; i < questions.length + 1; i += 1) {
      const questionInput = questionInputs[i];
      fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idForUnit, questionInput })
      }).then(
        response => {
          if (response.ok) {
            return;
          }
          throw new Error('Request failed!');
        },
        networkError => console.log(networkError.message)
      );
    }
    this.setState({ questions: [], questionInputs: {} });
  }

  unitChangeModal() {
    this.setState(prevState => ({
      unitModalType: !prevState.unitModalType
    }));
  }

  create(unitNames, isTeacher) {
    this.unitBoxes = [];
    for (let i = 0; i < unitNames.length; i += 1) {
      this.unitBoxes.push(
        <Unitbox
          unitName={unitNames[i].unit_name}
          key={unitNames[i].id}
          id={unitNames[i].id}
          path={isTeacher ? '/lessons' : '/survey'}
          reRender={this.componentWillMount}
          isTeacher={isTeacher}
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
      unitName,
      isTeacher
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
          <div className="Unit-body">
            <h2 className="Unit-header">My Units</h2>
            <div className="Unit-boxes">
              <button
                className="addButton"
                type="submit"
                onClick={this.openModal}
                unitName="+ Add New Unit"
                buttonType="add"
              >
                +&nbsp;&nbsp;Add New Unit
              </button>

              {this.create(unitList, isTeacher)}
              <Modal
                className="newUnitModal"
                isOpen={modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
              >
                <div className="modalTitle">Add New Unit</div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
                  <label htmlFor="unitname" id="unitname">
                    Unit Name
                  </label>
                  <input
                    className="inputText"
                    ref={this.inputText}
                    type="text"
                    onKeyUp={e => {
                      if (e.keyCode === 13 && e.shiftKey === false) {
                        e.preventDefault();
                        this.saveUnitName(unitName);
                        this.unitChangeModal();
                      }
                    }}
                  />
                </form>
                <div className="buttonwrapper">
                  <button
                    type="button"
                    className="cancelButton"
                    onClick={this.closeModal}
                    close
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    id="next"
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
            type="button"
            onClick={this.openModal}
            unitName="+ Add New Unit"
            buttonType="add"
          >
            +&nbsp;&nbsp;Add New Unit
          </button>
          {this.create(unitList, isTeacher)}
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
                type="button"
                className="cancelButton"
                onClick={this.unitChangeModal}
                close
              >
                Back
              </button>
              <button
                type="button"
                id="OK"
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

import React, { Component } from 'react';
import Modal from 'react-modal';
import AddClassModal from './AddClassModal';
import AddLessonModal from './AddLessonModal';
import AddUnitModal from './AddUnitModal';

const ModalConductor = props => {
  switch (props.currentModal) {
    case ''
  }
}
class ModalConductor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="App">
        <button type="submit" onClick={this.toggleModal}>
          Open the modal
        </button>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>
      </div>
    );
  }
}

export default App;

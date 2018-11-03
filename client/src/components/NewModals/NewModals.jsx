// import React, { Component } from 'react';
// import ModalWrapper from '../Modals/ModalWrapper'; // Import SimpleModal component
// // Declaration of the component as React Class Component
// class NewModals extends Component {
//   // Init of the component before it is mounted.
//   // Sets the modal visibility (showModal) to false.
//   constructor() {
//     super();
//     const { showModal } = this.state;
//     this.showModal = this.showModal.bind(this);
//   }
//   // Handle the visibility of the modal.
//   // If `state.showModal` is false, sets it to true,
//   // if is true, sets it to false.

//   handleToggleModal() {
//     this.setState({
//       showModal: !this.showModal
//     });
//   }

//   render() {
//     const { showModal } = this.state;
//     return (
//       <div>
//         <button type="button" onClick={() => this.handleToggleModal()}>
//           Open Modal
//         </button>
//         {showModal && (
//           <ModalWrapper onCloseRequest={() => this.handleToggleModal()}>
//             <img src="https://placeimg.com/900/650/nature" alt="Nature" />
//           </ModalWrapper>
//         )}
//       </div>
//     );
//   }
// }
// export default NewModals;

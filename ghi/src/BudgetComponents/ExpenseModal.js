// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ExpenseForm from './ExpenseForm';


// function Example(budget) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch static backdrop modal
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Expense Form</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
          
//         <ExpenseForm props={budget}/>


//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" >Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// // render(<Example />);

// export default Example;


import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteCardModal({ show, handleClose, handleDelete, card }) {
	if (!card) return null;
	const { title, _id: cardId } = card;
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className='text-center border-0 w-100'>
				<Modal.Title>Warning</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-center fw-400 fs-5 border-0'>
				<p className='text-capitalize'>Are you sure you want to delete the {title} Business card?</p>
			</Modal.Body>

			<Modal.Footer className='justify-content-center border-0'>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button variant='danger' onClick={() => handleDelete(cardId)}>
					Yes, Delete It
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteCardModal;

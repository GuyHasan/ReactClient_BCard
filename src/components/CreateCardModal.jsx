import { Modal } from "react-bootstrap";
import CreateCard from "./CreateCard";

function CreateCardModal({ show, setShow }) {
	return (
		<>
			<Modal show={show} onHide={setShow} size='lg' className='text-center' aria-labelledby='contained-modal-title-vcenter' centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>Create Business Card</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreateCard setShow={setShow} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CreateCardModal;

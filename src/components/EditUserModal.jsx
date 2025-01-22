import { Modal } from "react-bootstrap";
import EditUser from "./EditUser";

function EditUserModal({ show, setShow, user, setUser }) {
	return (
		<>
			<Modal show={show} onHide={setShow} size='lg' className='text-center' aria-labelledby='contained-modal-title-vcenter' centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>Edit User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditUser user={user} setUser={setUser} setShow={setShow} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditUserModal;

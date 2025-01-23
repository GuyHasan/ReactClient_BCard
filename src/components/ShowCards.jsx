import { useContext, useState } from "react";
import EditCardModal from "./EditCardModal";
import { deleteCard, likeCard } from "../services/cardService";
import { authContext, cardContext } from "../App";
import { jwtDecode } from "jwt-decode";
import { successMessage } from "../services/messageServices";
import { useMoveToBusinessPage } from "../hooks/moveToBusinessPage";
import DeleteCardModal from "./DeleteCardModal";

export const ShowCards = ({ cards = [] }) => {
	const moveToBusinessPage = useMoveToBusinessPage();

	const { setCardsChanged } = useContext(cardContext);
	const { userLoggedIn, token } = useContext(authContext);
	const userId = token ? jwtDecode(token)._id : null;

	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [editedCard, setEditedCard] = useState(null);
	const [deletedCard, setDeletedCard] = useState(null);

	const handleLike = async (cardId) => {
		try {
			await likeCard(cardId);
			setCardsChanged((prev) => !prev);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = (card) => {
		setEditedCard(card);
		setShowEditModal(true);
	};
	const handleModalClose = (edited = false) => {
		setShowEditModal(false);
		if (edited) successMessage("Card Edited Successfully");
	};

	const handleDelete = async (cardId) => {
		try {
			await deleteCard(cardId);
			setCardsChanged((prev) => !prev);
			setShowDeleteModal(false);
			successMessage("Card Deleted Successfully");
		} catch (error) {
			console.log(error);
		}
	};

	return cards.map((card) => (
		<div className='card mx-auto h-10 text-wrap text-break' key={card._id}>
			<img src={card.image.url} alt={card.image.alt} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
			<div className='card-body text-center d-flex flex-column justify-content-between align-items-center'>
				<h5 className='card-title text-capitalize mx-5'>{card.title}</h5>
				<h6 className='card-subtitle text-muted text-capitalize mb-2'>{card.subtitle}</h6>
				<p className='card-text mb-0'>
					<i className='fa-solid fa-paper-plane'></i> <span className='fw-bold'>Email:</span> {card.email}
				</p>
				<p className='card-text mb-0'>
					<i className='fa-solid fa-phone'></i> <span className='fw-bold'>Phone:</span> {card.phone}
				</p>
				<p className='card-text text-capitalize'>
					<i className='fa-solid fa-map-location-dot'></i> <span className='fw-bold'>Address:</span> {card.address.country}, {card.address.city}, {card.address.street} {card.address.houseNumber}
				</p>
				<button className='btn btn-info mb-3 w-75 ' onClick={() => moveToBusinessPage(card._id)}>
					See Business Page
				</button>
				<div className='d-flex justify-content-between gap-3'>
					{userLoggedIn &&
						(card.likes.includes(userId) ? (
							<i className='fa-solid fa-heart' onClick={() => handleLike(card._id)} style={{ cursor: "pointer" }}></i>
						) : (
							<i className='fa-regular fa-heart' onClick={() => handleLike(card._id)} style={{ cursor: "pointer" }}></i>
						))}
					{userId == card.user_id && (
						<div className='d-flex gap-3'>
							<i className='fa-solid fa-pencil' style={{ cursor: "pointer" }} onClick={() => handleEdit(card)}></i>
							<i
								className='fa-solid fa-trash'
								style={{ cursor: "pointer" }}
								onClick={() => {
									setShowDeleteModal(true);
									setDeletedCard(card);
								}}></i>
						</div>
					)}
				</div>
				<EditCardModal card={editedCard} show={showEditModal} handleClose={handleModalClose} />
				<DeleteCardModal handleDelete={handleDelete} card={deletedCard} show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} />
			</div>
		</div>
	));
};

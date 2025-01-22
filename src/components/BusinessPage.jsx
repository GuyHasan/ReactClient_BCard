import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCardById } from "../services/cardService";

function BusinessPage() {
	let { id } = useParams();
	let [card, setCard] = useState(null);
	const navigate = useNavigate();

	const fetchCard = async () => {
		try {
			let card = await getCardById(id);
			if (!card) throw new Error("Card not found");
			setCard(card);
		} catch (error) {
			console.log(error);
			navigate("*");
		}
	};
	useEffect(() => {
		fetchCard();
	}, [id]);
	return (
		<>
			{card ? (
				<div className='container text-center my-5 '>
					<img src={card.image.url} alt={card.image.alt} style={{ width: "100%", height: "300px", objectFit: "contain", clipPath: "circle()" }} className='mb-3' />
					<h4 className=' fw-bold text-capitalize'>{card.title}</h4>
					<h6 className='text-muted text-capitalize'>{card.subtitle}</h6>
					<p> {card.description}</p>
					<p style={{ lineHeight: "1.5" }}>
						Contact info:
						<br />
						<span className='fw-bold'>Email:</span> {card.email}
						<br />
						<span className='fw-bold'>Phone:</span> {card.phone}
						<br />
						<span className='fw-bold'>Address:</span> {card.address.country}, {card.address.city}, {card.address.street} {card.address.houseNumber}
						{card.web && (
							<>
								<br />
								<span className='fw-bold'>Website: </span>
								{card.web}
							</>
						)}
					</p>
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</>
	);
}

export default BusinessPage;

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCards } from "../services/cardService";
import { ShowCards } from "./ShowCards";
import { cardContext } from "../App";
import { Spinner } from "react-bootstrap";

function Home() {
	let [exampleCards, setExampleCards] = useState([]);
	let [hasFetched, setHasFetched] = useState(false);
	let { cardsChanged, loading, setLoading } = useContext(cardContext);

	const fetchExampleCards = async () => {
		try {
			setLoading(true);
			let cards = await getAllCards();
			cards = cards.slice(0, 6);
			setExampleCards(cards);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setHasFetched(true);
		}
	};
	useEffect(() => fetchExampleCards, []);

	const updateCardsFetch = async () => {
		let updatedCards = await getAllCards();
		updatedCards = updatedCards.slice(0, 6);
		setExampleCards(updatedCards);
	};
	useEffect(() => {
		updateCardsFetch();
	}, [cardsChanged]);

	const navigate = useNavigate();
	const handleCardsNavigition = () => {
		navigate("/cards");
	};
	return (
		<>
			<div className='container d-flex flex-column justify-content-center align-items-center gap-3 mt-5 home'>
				<h2 className='text-center'>BCard - Worldwide Business Site </h2>
				<h5 className='text-center'>Welcome to BCard!</h5>
				<p className='w-75 text-center text-wrap text-capitalize' style={{ lineHeight: "1.5" }}>
					The Biggest Site For Business, A One of a kind website that Include Any Type of Business, Each Represented by a Business Card. <br />
					Each Business Have is Own Page With Advance Information About it, In Addition, by register to are website You Can Add Your Own Business Card, Edit it, Delete it, Save Your Favorite Business, and More! The website gatherer many
					type of information about diffrenets type of business, you can look around and search for your desire business! here is some examples:
				</p>
				{loading && !hasFetched ? (
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				) : exampleCards.length === 0 ? (
					<h3>Not Found Any Cards</h3>
				) : (
					<div className='d-flex flex-wrap gap-5 px-5 justify-content-center my-2 w-100'>
						<ShowCards cards={exampleCards} />
					</div>
				)}
				<button onClick={handleCardsNavigition} className='btn btn-primary mb-5 mt-2'>
					To All The Cards
				</button>
				<p className='spacerFromFooter'></p>
			</div>
		</>
	);
}

export default Home;

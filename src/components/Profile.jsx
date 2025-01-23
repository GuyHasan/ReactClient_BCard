import { useContext, useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { authContext, userContext } from "../App";
import EditUserModal from "./EditUserModal";
import useAuth from "../hooks/useAuth";
import { Spinner } from "react-bootstrap";

function Profile() {
	useAuth("profile");

	let { token } = useContext(authContext);
	let { userChanged } = useContext(userContext);
	let [user, setUser] = useState({});
	let [showEdit, setShowEdit] = useState(false);
	let [hasFetched, setHasFetched] = useState(false);
	let [loading, setLoading] = useState(false);

	const fetchUser = async () => {
		try {
			setLoading(true);
			let userData = await getUser(token);
			setUser(userData);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setHasFetched(true);
		}
	};

	useEffect(() => {
		if (token) {
			fetchUser();
		} else {
			setUser({});
		}
	}, [token]);

	const updateUserFetch = async () => {
		let updatedUser = await getUser(token);
		setUser(updatedUser);
	};
	useEffect(() => {
		updateUserFetch();
	}, [userChanged]);

	return (
		<>
			<h1 className='text-center my-4'>Your Profile</h1>
			{loading && !hasFetched ? (
				<div className='d-flex justify-content-center'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			) : !hasFetched ? (
				<div className='d-flex justify-content-center'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			) : Object.keys(user).length === 0 ? (
				<h1 className='text-center'>Loading...</h1>
			) : (
				<div className='container'>
					<div className='card mx-auto my-4 shadow-sm' style={{ maxWidth: "600px" }} key={user._id}>
						<img src={user.image.url} alt={user.image.alt} className='card-img-top my-3' style={{ height: "300px", objectFit: "contain" }} />
						<div className='card-body text-center'>
							<h5 className='card-title text-capitalize'>
								{user.name.first} {user.name.last}
							</h5>
							<p className='card-text'>
								<span className='fw-bold'>Email:</span> {user.email}
							</p>
							<p className='card-text'>
								<span className='fw-bold'>Phone:</span> {user.phone}
							</p>
							<p className='card-text text-capitalize'>
								<span className='fw-bold'>Address:</span> {user.address.country}, {user.address.city}, {user.address.street} {user.address.houseNumber}
							</p>
							<p className='card-text'>
								<span className='fw-bold'>User Type:</span> {user.isBusiness ? "Business" : "Personal"}
							</p>
							<button className='btn btn-light position-absolute' style={{ top: "15px", right: "15px" }} onClick={() => setShowEdit(true)}>
								<i className='fa-solid fa-pencil'></i>
							</button>
						</div>
					</div>
				</div>
			)}
			<EditUserModal show={showEdit} setShow={setShowEdit} user={user} setUser={setUser} />
		</>
	);
}

export default Profile;

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar() {
	const navigate = useNavigate();
	const location = useLocation();
	const searchRef = useRef(null);
	const handleSearch = (e) => {
		const query = searchRef.current.value;
		navigate(`/cards?search=${query}`);
	};
	useEffect(() => {
		if (location.pathname !== "/cards") {
			searchRef.current.value = "";
		}
	}, [location]);
	return (
		<>
			<div className='d-flex searchBarDiv'>
				<input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' ref={searchRef} onChange={handleSearch} />
			</div>
		</>
	);
}

export default SearchBar;

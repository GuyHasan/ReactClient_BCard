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
			<div className='d-flex searchBarDiv position-relative'>
				<input className='form-control me-2' type='search' placeholder='Search Business...' aria-label='Search' ref={searchRef} onChange={handleSearch} />
				<i className='fas fa-search position-absolute top-50 end-0 translate-middle-y me-3'></i>
			</div>
		</>
	);
}

export default SearchBar;

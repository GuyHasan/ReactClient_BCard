import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className='container text-center mt-5'>
			<div className='row'>
				<div className='col'>
					<h1 className='display-4'>404</h1>
					<p className='lead'>Page Not Found</p>
					<Link to='/' className='btn btn-primary'>
						Go to Home Page
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NotFound;

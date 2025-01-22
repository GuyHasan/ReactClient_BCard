import { useFormik } from "formik";
import * as yup from "yup";
import { userLogin } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { errorMessage, successMessage } from "../services/messageServices";
import { authContext } from "../App";

function Login() {
	let { setUserLoggedIn } = useContext(authContext);
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup.string().email().required(),
			password: yup.string().required().min(9, "Password must be at least 9 characters long"),
		}),
		onSubmit: async (values) => {
			try {
				const fetchedToken = await userLogin(values.email, values.password);
				if (fetchedToken) {
					sessionStorage.setItem("token", fetchedToken);
					setUserLoggedIn(true);
					navigate("/");
					successMessage("Logged in successfully, Welcome!");
				} else {
					errorMessage("Invalid Email or Password");
				}
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<>
			<h1 className='w-100 text-center mt-5'>Login</h1>
			<form onSubmit={formik.handleSubmit} className='my-3 w-50 mx-auto'>
				<div className='form-floating mb-3'>
					<input name='email' type='email' className='form-control' id='email' placeholder='name@example.com' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
					<label htmlFor='email'>Email address</label>
				</div>
				{formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
				<div className='form-floating'>
					<input name='password' type='password' className='form-control' id='password' placeholder='Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
					<label htmlFor='password'>Password</label>
				</div>
				{formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
				<button type='submit' className='btn btn-primary my-4 mx-auto d-block' disabled={!formik.isValid || !formik.dirty}>
					Login
				</button>
			</form>
			<p className='text-center'>
				Don't Have a User? You Can Register <Link to='/signup'>Here</Link>
			</p>
		</>
	);
}

export default Login;

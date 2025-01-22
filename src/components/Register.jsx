import { useFormik } from "formik";
import * as yup from "yup";
import { errorMessage, successMessage } from "../services/messageServices";
import { ToastContainer } from "react-toastify";
import { registerUser } from "../services/userService";
import { Link } from "react-router-dom";

function Register() {
	const formik = useFormik({
		initialValues: {
			name: {
				first: "",
				middle: "",
				last: "",
			},
			phone: "",
			email: "",
			password: "",
			image: {
				url: "",
				alt: "",
			},
			address: {
				state: "",
				country: "",
				city: "",
				street: "",
				houseNumber: "",
				zip: "",
			},
			isBusiness: false,
		},
		validationSchema: yup.object({
			name: yup.object({
				first: yup.string().required("First Name is required").min(2, "First Name must be at least 2 characters").max(256, "First Name must be at most 256 characters"),
				middle: yup.string().min(2, "Middle Name must be at least 2 characters").max(256, "Middle Name must be at most 256 characters"),
				last: yup.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters").max(256, "Last Name must be at most 256 characters"),
			}),
			phone: yup
				.string()
				.matches(/^05\d([-]{0,1})\d{7}$/, "Phone Number is not valid")
				.required("Phone Number is required"),
			email: yup.string().email("Invalid Email Format").required("Email is required").min(5, "Email must be at least 5 characters"),
			password: yup
				.string()
				.required("Password is required")
				.min(9, "Password must be at least 9 characters")
				.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/, "Password must contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"),
			image: yup.object({
				url: yup.string().url("Invalid URL Format").min(14, "URL must be at least 14 characters"),
				alt: yup.string().min(2, "Alt Text must be at least 2 characters").max(256, "Alt Text must be at most 256 characters"),
			}),
			address: yup.object({
				state: yup.string().min(2, "State must be at least 2 characters").max(256, "State must be at most 256 characters"),
				country: yup.string().required("Country is required").min(2, "Country must be at least 2 characters").max(256, "Country must be at most 256 characters"),
				city: yup.string().required("City is required").min(2, "City must be at least 2 characters").max(256, "City must be at most 256 characters"),
				street: yup.string().required("Street is required").min(2, "Street must be at least 2 characters").max(256, "Street must be at most 256 characters"),
				houseNumber: yup.number().required("House Number is required").min(2, "House Number must be at least 2").max(256, "House Number must be at most 256"),
				zip: yup.number().min(1, "Zip Code must be at least 1").max(9999999, "Zip Code must be at most seven digits").required("Zip Code is required"),
			}),
			isBusiness: yup.boolean().required("Business status is required"),
		}),
		onSubmit: async (values) => {
			try {
				console.log(values);
				let user = await registerUser(values);
				if (user) {
					successMessage("User Registered Successfully");
					formik.resetForm();
				}
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<>
			<div className='container w-100 mt-5 p-0 pb-5'>
				<h1 className='w-100 text-center'>Register</h1>
				<form onSubmit={formik.handleSubmit} className='my-3 w-75 mx-auto'>
					<div className='row g-0'>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='name.first' type='text' className='form-control' id='first' placeholder='First Name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name.first} />
							<label htmlFor='first'>First Name</label>
							{formik.errors.name?.first && formik.touched.name?.first && <div className='text-danger'>{formik.errors.name.first}</div>}
						</div>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='name.middle' type='text' className='form-control' id='middle' placeholder='Middle Name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name.middle} />
							<label htmlFor='middle'>Middle Name</label>
							{formik.errors.name?.middle && formik.touched.name?.middle && <div className='text-danger'>{formik.errors.name.middle}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='name.last' type='text' className='form-control' id='last' placeholder='Last Name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name.last} />
							<label htmlFor='last'>Last Name</label>
							{formik.errors.name?.last && formik.touched.name?.last && <div className='text-danger'>{formik.errors.name.last}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='phone' type='text' className='form-control' id='phone' placeholder='Phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} />
							<label htmlFor='phone'>Phone</label>
							{formik.errors.phone && formik.touched.phone && <div className='text-danger'>{formik.errors.phone}</div>}
						</div>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='email' type='email' className='form-control' id='email' placeholder='Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
							<label htmlFor='email'>Email</label>
							{formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='password' type='password' className='form-control' id='password' placeholder='Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
							<label htmlFor='password'>Password</label>
							{formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='image.url' type='text' className='form-control' id='imageUrl' placeholder='Image URL' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.image.url} />
							<label htmlFor='imageUrl'>Image URL</label>
							{formik.errors.image?.url && formik.touched.image?.url && <div className='text-danger'>{formik.errors.image.url}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='image.alt' type='text' className='form-control' id='imageAlt' placeholder='Image Alt' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.image.alt} />
							<label htmlFor='imageAlt'>Image Alt</label>
							{formik.errors.image?.alt && formik.touched.image?.alt && <div className='text-danger'>{formik.errors.image.alt}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='address.state' type='text' className='form-control' id='state' placeholder='State' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address.state} />
							<label htmlFor='state'>State</label>
							{formik.errors.address?.state && formik.touched.address?.state && <div className='text-danger'>{formik.errors.address.state}</div>}
						</div>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='address.country' type='text' className='form-control' id='country' placeholder='Country' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address.country} />
							<label htmlFor='country'>Country</label>
							{formik.errors.address?.country && formik.touched.address?.country && <div className='text-danger'>{formik.errors.address.country}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='address.city' type='text' className='form-control' id='city' placeholder='City' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address.city} />
							<label htmlFor='city'>City</label>
							{formik.errors.address?.city && formik.touched.address?.city && <div className='text-danger'>{formik.errors.address.city}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='address.street' type='text' className='form-control' id='street' placeholder='Street' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address.street} />
							<label htmlFor='street'>Street</label>
							{formik.errors.address?.street && formik.touched.address?.street && <div className='text-danger'>{formik.errors.address.street}</div>}
						</div>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='address.houseNumber' type='number' className='form-control' id='houseNumber' placeholder='House Number' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address.houseNumber} />
							<label htmlFor='houseNumber'>House Number</label>
							{formik.errors.address?.houseNumber && formik.touched.address?.houseNumber && <div className='text-danger'>{formik.errors.address.houseNumber}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='address.zip' type='number' className='form-control' id='zip' placeholder='Zip' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address.zip} />
							<label htmlFor='zip'>Zip</label>
							{formik.errors.address?.zip && formik.touched.address?.zip && <div className='text-danger'>{formik.errors.address.zip}</div>}
						</div>
					</div>
					<div className='form-check form-switch mb-3'>
						<input name='isBusiness' type='checkbox' className='form-check-input' id='isBusiness' onBlur={formik.handleBlur} onChange={formik.handleChange} checked={formik.values.isBusiness} />
						<label className='form-check-label text-left' htmlFor='isBusiness'>
							Business Profile
						</label>
						{formik.errors.isBusiness && formik.touched.isBusiness && <div className='text-danger'>{formik.errors.isBusiness}</div>}
					</div>

					<div className='d-flex justify-content-center'>
						<button type='submit' className='btn btn-success' disabled={!formik.isValid || !formik.dirty}>
							Signup
						</button>
					</div>
				</form>
				<p className='text-center'>
					Already Registered? You Can Login <Link to='/login'>Here</Link>
				</p>
			</div>
			<p className='spacerFromFooter mt-5'></p>
		</>
	);
}

export default Register;

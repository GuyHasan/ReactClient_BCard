import { useFormik } from "formik";
import * as yup from "yup";
import { createCard } from "../services/cardService";
import { useContext } from "react";
import { cardContext } from "../App";
import { successMessage } from "../services/messageServices";

function CreateCard({ setShow }) {
	const { setCardsChanged } = useContext(cardContext);
	const formik = useFormik({
		initialValues: {
			title: "",
			subtitle: "",
			description: "",
			phone: "",
			email: "",
			web: "",
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
		},
		validationSchema: yup.object({
			title: yup.string().required("Title is required").min(2, "Title must be at least 2 characters").max(256, "Title must be at most 256 characters"),
			subtitle: yup.string().required("Subtitle is required").min(2, "Subtitle must be at least 2 characters").max(256, "Subtitle must be at most 256 characters"),
			description: yup.string().required("Description is required").min(2, "Description must be at least 2 characters").max(1024, "Description must be at most 1024 characters"),
			phone: yup
				.string()
				.required("Phone Number is required")
				.matches(/^0\d{1,2}-?\d{7}$/, "Phone Number must be a valid Israeli phone number"),
			email: yup.string().email("Invalid email format").required("Email is required").min(5, "Email must be at least 5 characters"),
			web: yup.string().url("Invalid URL format").required("Website is required").min(14, "Website must be at least 14 characters"),
			image: yup
				.object({
					url: yup.string().url("Invalid URL format").min(14, "Image URL must be at least 14 characters"),
					alt: yup.string().min(2, "Image Alt must be at least 2 characters").max(256, "Image Alt must be at most 256 characters"),
				})
				.required(),
			address: yup
				.object({
					state: yup.string().min(2, "State must be at least 2 characters"),
					country: yup.string().required("Country is required"),
					city: yup.string().required("City is required"),
					street: yup.string().required("Street is required"),
					houseNumber: yup.number().required("House Number is required").min(1, "House Number must be at least 1"),
					zip: yup
						.number()
						.max(9999999, "Zip must be at most seven digits")
						.nullable()
						.transform((value, originalValue) => (originalValue === "" ? null : value)),
				})
				.required(),
		}),
		onSubmit: async (values) => {
			try {
				const newCard = await createCard(values);
				if (newCard) {
					setCardsChanged((prev) => !prev);
					setShow(false);
					successMessage("Card created successfully");
				}
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<>
			<div className='container w-100 text-center'>
				<form onSubmit={formik.handleSubmit}>
					<div className='row g-0'>
						<div className='form-floating mb-3 me-3 col-sm'>
							<input type='text' name='title' className='form-control' id='title' placeholder='Title' value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='title'>Title*</label>
							{formik.errors.title && formik.touched.title && <div className='text-danger'>{formik.errors.title}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input type='text' name='subtitle' className='form-control' id='subtitle' placeholder='Subtitle' value={formik.values.subtitle} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='subtitle'>Subtitle*</label>
							{formik.errors.subtitle && formik.touched.subtitle && <div className='text-danger'>{formik.errors.subtitle}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 me-3 col-sm'>
							<input type='text' name='description' className='form-control' id='description' placeholder='Description' value={formik.values.description} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='description'>Description*</label>
							{formik.errors.description && formik.touched.description && <div className='text-danger'>{formik.errors.description}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input type='text' name='phone' className='form-control' id='phone' placeholder='Phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='phone'>Phone*</label>
							{formik.errors.phone && formik.touched.phone && <div className='text-danger'>{formik.errors.phone}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 me-3 col-sm'>
							<input type='email' name='email' className='form-control' id='email' placeholder='Email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='email'>Email*</label>
							{formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input type='url' name='web' className='form-control' id='web' placeholder='Website' value={formik.values.web} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='web'>Website*</label>
							{formik.errors.web && formik.touched.web && <div className='text-danger'>{formik.errors.web}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 me-3 col-sm'>
							<input type='url' name='image.url' className='form-control' id='imageUrl' placeholder='Image URL' value={formik.values.image.url} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='imageUrl'>Image URL*</label>
							{formik.errors.image?.url && formik.touched.image?.url && <div className='text-danger'>{formik.errors.image.url}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input type='text' name='image.alt' className='form-control' id='imageAlt' placeholder='Image Alt' value={formik.values.image.alt} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='imageAlt'>Image Alt*</label>
							{formik.errors.image?.alt && formik.touched.image?.alt && <div className='text-danger'>{formik.errors.image.alt}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 me-3 col-sm'>
							<input type='text' name='address.state' className='form-control' id='state' placeholder='State' value={formik.values.address.state} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='state'>State</label>
							{formik.errors.address?.state && formik.touched.address?.state && <div className='text-danger'>{formik.errors.address.state}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input type='text' name='address.country' className='form-control' id='country' placeholder='Country' value={formik.values.address.country} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='country'>Country*</label>
							{formik.errors.address?.country && formik.touched.address?.country && <div className='text-danger'>{formik.errors.address.country}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 me-3 col-sm'>
							<input type='text' name='address.city' className='form-control' id='city' placeholder='City' value={formik.values.address.city} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='city'>City*</label>
							{formik.errors.address?.city && formik.touched.address?.city && <div className='text-danger'>{formik.errors.address.city}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input type='text' name='address.street' className='form-control' id='street' placeholder='Street' value={formik.values.address.street} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='street'>Street*</label>
							{formik.errors.address?.street && formik.touched.address?.street && <div className='text-danger'>{formik.errors.address.street}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 me-3 col-sm'>
							<input type='number' name='address.houseNumber' className='form-control' id='houseNumber' placeholder='House Number' value={formik.values.address.houseNumber} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='houseNumber'>House Number*</label>
							{formik.errors.address?.houseNumber && formik.touched.address?.houseNumber && <div className='text-danger'>{formik.errors.address.houseNumber}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input type='number' name='address.zip' className='form-control' id='zip' placeholder='Zip Code' value={formik.values.address.zip} onBlur={formik.handleBlur} onChange={formik.handleChange} />
							<label htmlFor='zip'>Zip Code</label>
							{formik.errors.address?.zip && formik.touched.address?.zip && <div className='text-danger'>{formik.errors.address.zip}</div>}
						</div>
					</div>

					<button type='submit' className='btn btn-primary' disabled={!formik.isValid || !formik.dirty}>
						Submit
					</button>
				</form>
			</div>
		</>
	);
}

export default CreateCard;

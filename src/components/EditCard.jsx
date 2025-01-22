import { useFormik } from "formik";
import * as yup from "yup";
import { updateCard } from "../services/cardService";
import { cardContext } from "../App";
import { useContext } from "react";

function EditCard({ card, handleClose }) {
	const { setCardsChanged } = useContext(cardContext);
	const formik = useFormik({
		initialValues: {
			title: card.title || "",
			subtitle: card.subtitle || "",
			description: card.description || "",
			phone: card.phone || "",
			email: card.email || "",
			web: card.web || "",
			image: {
				url: card.image.url || "",
				alt: card.image.alt || "",
			},
			address: {
				state: card.address.state || "",
				country: card.address.country || "",
				city: card.address.city || "",
				street: card.address.street || "",
				houseNumber: card.address.houseNumber || "",
				zip: card.address.zip || "",
			},
		},
		enableReinitialize: true,
		validationSchema: yup.object({
			title: yup.string().required("Title is required").min(2, "Title must be at least 2 characters").max(256, "Title must be at most 256 characters"),
			subtitle: yup.string().required("Subtitle is required").min(2, "Subtitle must be at least 2 characters").max(256, "Subtitle must be at most 256 characters"),
			description: yup.string().required("Description is required").min(2, "Description must be at least 2 characters").max(1024, "Description must be at most 1024 characters"),
			phone: yup
				.string()
				.required("Phone Number is required")
				.matches(/^0\d{1,2}-?\d{7}$/, "Phone Number must be a valid Israeli phone number"),
			email: yup.string().required("Email is required").email("Invalid email format"),
			web: yup.string().url("Invalid URL format"),
			image: yup
				.object({
					url: yup.string().url("Invalid URL Format").min(14, "URL must be at least 14 characters"),
					alt: yup.string().min(2, "Alt Text must be at least 2 characters").max(256, "Alt Text must be at most 256 characters"),
				})
				.required("Image is required"),
			address: yup
				.object({
					state: yup.string(),
					country: yup.string().required("Country is required"),
					city: yup.string().required("City is required"),
					street: yup.string().required("Street is required"),
					houseNumber: yup.number().required("House Number is required").min(1, "House Number must be at least 1"),
					zip: yup.number().max(9999999, "Zip must be at most seven digits"),
				})
				.required("Address is required"),
		}),
		onSubmit: async (values) => {
			try {
				let newCard = await updateCard(values, card._id);
				if (newCard) {
					setCardsChanged((prev) => !prev);
					handleClose(true);
				}
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit} className='my-3 w-75 mx-auto'>
				<div className='row g-0'>
					<div className='form-floating mb-3 col-sm me-3'>
						<input name='title' type='text' className='form-control' id='title' placeholder='Title' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} />
						<label htmlFor='title'>Title</label>
						{formik.errors.title && formik.touched.title && <div className='text-danger'>{formik.errors.title}</div>}
					</div>
					<div className='form-floating mb-3 col-sm me-3'>
						<input name='subtitle' type='text' className='form-control' id='subtitle' placeholder='Subtitle' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.subtitle} />
						<label htmlFor='subtitle'>Subtitle</label>
						{formik.errors.subtitle && formik.touched.subtitle && <div className='text-danger'>{formik.errors.subtitle}</div>}
					</div>
					<div className='form-floating mb-3 col-sm'>
						<input name='description' type='text' className='form-control' id='description' placeholder='Description' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description} />
						<label htmlFor='description'>Description</label>
						{formik.errors.description && formik.touched.description && <div className='text-danger'>{formik.errors.description}</div>}
					</div>
				</div>

				<div className='row g-0'>
					<div className='form-floating mb-3 col-sm me-3'>
						<input name='phone' type='text' className='form-control' id='phone' placeholder='Phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} />
						<label htmlFor='phone'>Phone</label>
						{formik.errors.phone && formik.touched.phone && <div className='text-danger'>{formik.errors.phone}</div>}
					</div>
					<div className='form-floating mb-3 col-sm'>
						<input name='email' type='email' className='form-control' id='email' placeholder='Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
						<label htmlFor='email'>Email</label>
						{formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
					</div>
				</div>

				<div className='row g-0'>
					<div className='form-floating mb-3 col-sm me-3'>
						<input name='web' type='text' className='form-control' id='web' placeholder='Web' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.web} />
						<label htmlFor='web'>Web</label>
						{formik.errors.web && formik.touched.web && <div className='text-danger'>{formik.errors.web}</div>}
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

				<button type='submit' className='btn btn-primary' disabled={!formik.isValid || !formik.dirty}>
					Update
				</button>
			</form>
		</>
	);
}

export default EditCard;

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddProductForm = ({ onAddProduct, onCancel }, props) => {
	const [productInfo, setProductInfo] = useState({
		id: 0,
		title: '',
		price: 0,
		description: '',
		category: '',
		image: '',
		rate: 0,
		count: 0
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddProduct(productInfo);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formId">
				<Form.Label>ID</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter product id"
					name="id"
					onChange={handleChange}
					required
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formTitle">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter product title"
					name="title"
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formPrice">
				<Form.Label>Price</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter product price"
					name="price"
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formDescription">
				<Form.Label>Description</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter product description"
					name="description"
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formCategory">
				<Form.Label>Category</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter product category"
					name="category"
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formImage">
				<Form.Label>Image URL</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter image URL"
					name="image"
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formRating">
				<Form.Label>Rate</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter product rate"
					name="rate"
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formCount">
				<Form.Label>Count</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter product reviews count"
					name="count"
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Add Product
			</Button>
			<Button variant="secondary" onClick={onCancel} className="ml-2">
				Cancel
			</Button>
		</Form>
	);
};

export default AddProductForm;
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const UpdatePriceForm = ({productId, onUpdatePrice, onCancel}) => {
    const [newPrice, setNewPrice] = useState({
        price: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
		setNewPrice((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = (e) => {
		e.preventDefault();
		onUpdatePrice(productId, newPrice);
	};

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formId">
				<Form.Label>Price</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter new product price"
					name="id"
					onChange={handleChange}
                    required
				/>
			</Form.Group>

            <Button variant="primary" type="submit">
				Update Price
			</Button>
			<Button variant="secondary" onClick={onCancel} className="ml-2">
				Cancel
			</Button>
        </Form>
    );
}

export default UpdatePriceForm;
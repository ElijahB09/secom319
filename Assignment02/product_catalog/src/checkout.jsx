import React from 'react';
import './checkout.css';
import Button from 'react-bootstrap/Button';
import {loadReviewPage} from './shop';
import Card from 'react-bootstrap/Card';
import {ListGroup} from 'react-bootstrap';
import {productsInCart} from './shop.jsx';

const renderCartItems = () => {
	console.log(productsInCart);
	const renderItems = productsInCart.map((item, index) => (
		<ListGroup.Item key={index} className="item-container">
			<div className="item-title">{item.title}</div>
			<div className="item-price">{item.price}</div>
		</ListGroup.Item>
	));
	return <div id='checkout-section' className="custom-section col-md-5 col-lg-4 order-md-last card collapse"
				style={{width: '18rem'}}>
		<Card style={{width: '20rem'}}>
			<Card.Body>
				<Card.Title>Order Summary</Card.Title>
				<Card.Text>
					Please review the items in your cart before confirming your purchase.
				</Card.Text>
			</Card.Body>
			<ListGroup className="list-group-flush">
				{renderItems}
			</ListGroup>
			<Card.Body>
				<Card.Link href="#">Card Link</Card.Link>
				<Card.Link href="#">Another Link</Card.Link>
			</Card.Body>

			<Button onClick={loadReviewPage} className="btn btn-secondary"> <i className="bi-arrow-left-circle"></i>
				Purchase</Button>
		</Card>
	</div>;
}

const renderUserInput = () => {
	return <div id="user-input-section" className="col-md-7 col-lg-8 collapse">
		<form className="needs-validation" noValidate>
			<div className="row g-3">
				<div className="col-sm-6">
					<label htmlFor="firstName" className="form-label">First name</label>
					<input type="text" className="form-control" id="firstName" placeholder="" value="" required/>
					<div className="invalid-feedback">
						Valid first name is required.
					</div>
				</div>

				<div className="col-sm-6">
					<label htmlFor="lastName" className="form-label">Last name</label>
					<input type="text" className="form-control" id="lastName" placeholder="" value="" required/>
					<div className="invalid-feedback">
						Valid last name is required.
					</div>
				</div>

				<div className="col-12">
					<label htmlFor="username" className="form-label">Username</label>
					<div className="input-group has-validation">
						<span className="input-group-text">@</span>
						<input type="text" className="form-control" id="username" placeholder="Username" required/>
						<div className="invalid-feedback">
							Your username is required.
						</div>
					</div>
				</div>

				<div className="col-12">
					<label htmlFor="email" className="form-label">Email <span
						className="text-body-secondary">(Optional)</span></label>
					<input type="email" className="form-control" id="email" placeholder="you@example.com"/>
					<div className="invalid-feedback">
						Please enter a valid email address for shipping updates.
					</div>
				</div>

				<div className="col-12">
					<label htmlFor="address" className="form-label">Address</label>
					<input type="text" className="form-control" id="address" placeholder="1234 Main St" required/>
					<div className="invalid-feedback">
						Please enter your shipping address.
					</div>
				</div>

				<div className="col-12">
					<label htmlFor="address2" className="form-label">Address 2 <span
						className="text-body-secondary">(Optional)</span></label>
					<input type="text" className="form-control" id="address2" placeholder="Apartment or suite"/>
				</div>

				<div className="col-md-5">
					<label htmlFor="country" className="form-label">Country</label>
					<select className="form-select" id="country" required>
						<option value="">Choose...</option>
						<option>United States</option>
					</select>
					<div className="invalid-feedback">
						Please select a valid country.
					</div>
				</div>

				<div className="col-md-4">
					<label htmlFor="state" className="form-label">State</label>
					<select className="form-select" id="state" required>
						<option value="">Choose...</option>
						<option>California</option>
					</select>
					<div className="invalid-feedback">
						Please provide a valid state.
					</div>
				</div>

				<div className="col-md-3">
					<label htmlFor="zip" className="form-label">Zip</label>
					<input type="text" className="form-control" id="zip" placeholder="" required/>
					<div className="invalid-feedback">
						Zip code required.
					</div>
				</div>
			</div>


			<h4 className="mb-3">Payment</h4>

			<div className="my-3">
				<div className="form-check">
					<input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked
						   required/>
					<label className="form-check-label" htmlFor="credit">Credit card</label>
				</div>
				<div className="form-check">
					<input id="debit" name="paymentMethod" type="radio" className="form-check-input" required/>
					<label className="form-check-label" htmlFor="debit">Debit card</label>
				</div>
				<div className="form-check">
					<input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required/>
					<label className="form-check-label" htmlFor="paypal">PayPal</label>
				</div>
			</div>

			<div className="row gy-3">
				<div className="col-md-6">
					<label htmlFor="cc_name" className="form-label">Name on card</label>
					<input type="text" className="form-control" id="cc_name" placeholder="" required/>
					<small className="text-body-secondary">Full name as displayed on card</small>
					<div className="invalid-feedback">
						Name on card is required
					</div>
				</div>

				<div className="col-md-6">
					<label htmlFor="cc_number" className="form-label">Credit card number</label>
					<input type="text" className="form-control" id="cc_number" placeholder="" required/>
					<div className="invalid-feedback">
						Credit card number is required
					</div>
				</div>

				<div className="col-md-3">
					<label htmlFor="cc_expiration" className="form-label">Expiration</label>
					<input type="text" className="form-control" id="cc_expiration" placeholder="" required/>
					<div className="invalid-feedback">
						Expiration date required
					</div>
				</div>

				<div className="col-md-3">
					<label htmlFor="cc_cvv" className="form-label">CVV</label>
					<input type="text" className="form-control" id="cc_cvv" placeholder="" required/>
					<div className="invalid-feedback">
						Security code required
					</div>
				</div>
			</div>
		</form>
	</div>;
}

export const renderCheckout = () => {
	return <div className="row g-5">
		{renderCartItems()}
		{renderUserInput()}
	</div>;
}
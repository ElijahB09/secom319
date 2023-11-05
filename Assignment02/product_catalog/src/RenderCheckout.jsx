import React, { useState } from 'react';
import './checkout.css';
import {Button, Form} from 'react-bootstrap';
import {loadReviewPage} from './shop';
import Card from 'react-bootstrap/Card';
import {ListGroup} from 'react-bootstrap';
import {productsInCart} from './shop.jsx';

const RenderCheckout = () => {
	const [givenName, setGivenName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [address2, setAddress2] = useState('');
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [creditCardName, setCreditCardName] = useState('');
	const [creditCardNum, setCreditCardNum] = useState('');
	const [creditCardExp, setCreditCardExp] = useState('');
	const [creditCardCCV, setCreditCardCCV] = useState('');
	
	const handleSubmit = () => {
		var userInfo;
		var creditInfo
		if (givenName && surname && email && address && country && state && zipCode) {
			userInfo = {
				givenName,
				surname,
				email,
				address,
				address2,
				country,
				state,
				zipCode
			}
		} else {
			userInfo = null;
		}
		if (creditCardName && creditCardNum && creditCardExp && creditCardCCV) {
			creditInfo = {
				creditCardName,
				creditCardNum,
				creditCardExp,
				creditCardCCV
			}
		} else {
			creditInfo = null;
		}
		if (userInfo && creditInfo) {
			const user = {
				...userInfo,
				...creditInfo
			}
			loadReviewPage(user);
		}
	}

	console.log(productsInCart);
	const renderItems = productsInCart.map((item, index) => (
		<ListGroup.Item key={index} className="item-container">
			<div className="item-title">{item.title}</div>
			<div className="item-price">${item.price}</div>
		</ListGroup.Item>
	));
	return (
		<div className='row g-5'>
			<div id='checkout-section' className="custom-section col-md-5 col-lg-4 order-md-last card collapse" style={{width: '18rem'}}>
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

					<Button onClick={handleSubmit} className="btn btn-secondary"> <i className="bi-arrow-left-circle"></i>
						Purchase</Button>
				</Card>
			</div>

			<div id="user-input-section" className="col-md-7 col-lg-8 collapse needs-validation">
				<Form>
					<div className="row g-3">
						<div className="col-sm-6">
							<Form.Group
								controlId="givenName"
								onChange={(event) => {
									setGivenName(event.target.value);
								}}
							>
								<Form.Label>First Name</Form.Label>
								<Form.Control placeholder="First Name" />
							</Form.Group>
						</div>
						<div className='col-sm-6'>
							<Form.Group
								controlId="surname"
								onChange={(event) => {
									setSurname(event.target.value);
								}}
							>
								<Form.Label>Last Name</Form.Label>
								<Form.Control placeholder="Last Name" />
							</Form.Group>
						</div>
						<div className="col-12">
							<Form.Group
								controlId="email"
								onChange={(event) => {
									setEmail(event.target.value);
								}}
							>
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" placeholder="Email" />
							</Form.Group>
						</div>
						<div className="col-12">
							<Form.Group
								controlId="address"
								onChange={(event) => {
									setAddress(event.target.value);
								}}
							>
								<Form.Label>Shipping Address</Form.Label>
								<Form.Control placeholder="Shipping Address" />
							</Form.Group>
						</div>
						<div className="col-12">
							<Form.Group
								controlId="address2"
								onChange={(event) => {
									setAddress2(event.target.value);
								}}
							>
								<Form.Label>Address 2 (Optional)</Form.Label>
								<Form.Control placeholder="Address 2" />
							</Form.Group>
						</div>
						<div className="col-md-5">
							<Form.Group
								controlId="country"
								onChange={(event) => {
									setCountry(event.target.value);
								}}
							>
								<Form.Label>Country</Form.Label>
								<Form.Control placeholder="Country" />
							</Form.Group>
						</div>
						<div className="col-md-4">
							<Form.Group
								controlId="State"
								onChange={(event) => {
									setState(event.target.value);
								}}
							>
								<Form.Label>State</Form.Label>
								<Form.Control type="state" placeholder="State" />
							</Form.Group>
						</div>
						<div className="col-md-3">
							<Form.Group
								controlId="zipCode"
								onChange={(event) => {
									setZipCode(event.target.value);
								}}
							>
								<Form.Label>Zip Code</Form.Label>
								<Form.Control placeholder="Zip Code" />
							</Form.Group>
						</div>
					</div>

					<h4 className="mb-3">Payment</h4>

					<div className="row gy-3">
						<div className="col-md-6">
							<Form.Group
								controlId="ccName"
								onChange={(event) => {
									setCreditCardName(event.target.value);
								}}
							>
								<Form.Label>Card Name</Form.Label>
								<Form.Control placeholder="Name of Credit Card Holder" />
							</Form.Group>
						</div>
						<div className="col-md-6">
							<Form.Group
								controlId="ccNum"
								onChange={(event) => {
									setCreditCardNum(event.target.value);
								}}
							>
								<Form.Label>Card Number</Form.Label>
								<Form.Control placeholder="Card Number" />
							</Form.Group>
						</div>
						<div className="col-md-3">
							<Form.Group
								controlId="ccExp"
								onChange={(event) => {
									setCreditCardExp(event.target.value);
								}}
							>
								<Form.Label>Expiration Date</Form.Label>
								<Form.Control placeholder="XX/XX" />
							</Form.Group>
						</div>
						<div className="col-md-3">
							<Form.Group
								controlId="ccCCV"
								onChange={(event) => {
									setCreditCardCCV(event.target.value);
								}}
							>
								<Form.Label>CCV</Form.Label>
								<Form.Control placeholder="CCV" />
							</Form.Group>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default RenderCheckout;
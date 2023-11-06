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
	const [isZipCodeValid, setIsZipCodeValid] = useState(true);
	const [creditCardName, setCreditCardName] = useState('');
	const [creditCardNum, setCreditCardNum] = useState('');
	const [isCreditCardValid, setIsCreditCardValid] = useState(true);
	const [creditCardExp, setCreditCardExp] = useState('');
	const [isCreditCardExpValid, setIsCreditCardExpValid] = useState(true);
	const [creditCardCCV, setCreditCardCCV] = useState('');
	const [isCreditCardCCVValid, setIsCreditCardCCVValid] = useState(true);

	const handleCreditCardChange = (e) => {
		setIsCreditCardValid(/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(e));
		if (isCreditCardValid) {
			setCreditCardNum(e);
		}
	};

	const handleZipCodeChange = (e) => {
	  setIsZipCodeValid(/^\d{5}$/.test(e));
	  if (isZipCodeValid) {
		setZipCode(e);
	  }
	};

	const handleCCVChange = (e) => {
		setIsCreditCardCCVValid(/^\d{3}$/.test(e));
		if (isCreditCardCCVValid) {
			setCreditCardCCV(e);
		}
	};

	const handleExpDateChange = (e) => {
		setIsCreditCardExpValid(/^\d{2}\/\d{2}$/.test(e));
		if (isCreditCardExpValid) {
			setCreditCardExp(e);
		}
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if ((zipCode === '' && isZipCodeValid) || !isZipCodeValid ||
			(creditCardNum === '' && isCreditCardValid) || !isCreditCardValid ||
			(creditCardCCV === '' && isCreditCardCCVValid) || !isCreditCardCCVValid ||
			(creditCardExp === '' && isCreditCardExpValid) || !isCreditCardExpValid) {
			window.alert("All fields must be correctly filled out");
		} else {
			var userInfo;
			var creditInfo
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
			creditInfo = {
				creditCardName,
				creditCardNum,
				creditCardExp,
				creditCardCCV
			}
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
				<Card>
					<Card.Body>
						<Card.Title>Order Summary</Card.Title>
						<Card.Text>
							Please review the items in your cart before confirming your purchase.
						</Card.Text>
					</Card.Body>
					<ListGroup className="list-group-flush">
						{renderItems}
					</ListGroup>
				</Card>
			</div>

			<div id="user-input-section" className="col-md-7 col-lg-8 collapse needs-validation">
				<Form onSubmit={handleSubmit}>
					<div className="row g-3">
						<div className="col-sm-6">
							<Form.Group
								controlId="givenName"
								onChange={(event) => {
									setGivenName(event.target.value);
								}}
							>
								<Form.Label>First Name</Form.Label>
								<Form.Control placeholder="First Name" required />
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
								<Form.Control placeholder="Last Name" required />
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
								<Form.Control type="email" placeholder="Email" required />
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
								<Form.Control placeholder="Shipping Address" required />
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
								<Form.Control placeholder="Country" required />
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
								<Form.Control type="state" placeholder="State" required />
							</Form.Group>
						</div>
						<div className="col-md-3">
							<Form.Group
								controlId="zipCode"
								onChange={(event) => {
									handleZipCodeChange(event.target.value);
								}}
							>
								<Form.Label>Zip Code</Form.Label>
								<Form.Control placeholder="Zip Code" required />
								{isZipCodeValid ? null : <p className='invalid-text'>Invalid ZIP code format</p>}
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
								<Form.Control placeholder="Name of Credit Card Holder" required />
							</Form.Group>
						</div>
						<div className="col-md-6">
							<Form.Group
								controlId="ccNum"
								onChange={(event) => {
									handleCreditCardChange(event.target.value);
								}}
							>
								<Form.Label>Card Number</Form.Label>
								<Form.Control placeholder="Card Number" required />
								{isCreditCardValid ? null : <p className='invalid-text'>Invalid credit card number</p>}
							</Form.Group>
						</div>
						<div className="col-md-3">
							<Form.Group
								controlId="ccExp"
								onChange={(event) => {
									handleExpDateChange(event.target.value);
								}}
							>
								<Form.Label>Expiration Date</Form.Label>
								<Form.Control placeholder="XX/XX" required />
								{isCreditCardExpValid ? null : <p className='invalid-text'>Invalid Expiration Date</p>}
							</Form.Group>
						</div>
						<div className="col-md-3">
							<Form.Group
								controlId="ccCCV"
								onChange={(event) => {
									handleCCVChange(event.target.value);
								}}
							>
								<Form.Label>CCV</Form.Label>
								<Form.Control placeholder="CCV" required />
								{isCreditCardCCVValid ? null : <p className='invalid-text'>Invalid CCV number</p>}
							</Form.Group>
						</div>
					</div>
					<div className='submit-button'>
						<Button variant='primary' type='submit'>Purchase</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default RenderCheckout;
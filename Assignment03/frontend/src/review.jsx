import React from 'react';
import './review.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {ListGroup} from 'react-bootstrap';
import {formatter, productsInCart, user} from './shop';

export const renderReview = (userInfo) => {
	const renderItems = productsInCart.map((item, index) => (
		<ListGroup.Item key={index} className="item-container">
			<div className="item-title">{item.title}</div>
			<div className="item-price">${item.price}</div>
		</ListGroup.Item>
	));

	const price = productsInCart.reduce((totalCost, product) => {
		return totalCost + product.price;
	}, 0);


	console.log(userInfo);
	return (
		<div id='review-section' className='review-custom-section row g-5 collapse'>
			<div className="custom-section col-md-5 col-lg-4 order-md-last card "
				 style={{width: '18rem'}}>
				<Card>
					<Card.Body>
						<Card.Title>Order Summary</Card.Title>
						<Card.Text>
							Please review the items in your cart before confirming your purchase.
						</Card.Text>
					</Card.Body>
					<ListGroup className="list-group-flush">
						{renderItems}
						<ListGroup.Item className="d-flex justify-content-between">
							<span>Total:</span>
							<span><strong>{formatter.format(price)}</strong></span>
						</ListGroup.Item>
					</ListGroup>
				</Card>
				<Button href="location.reload()" className="btn btn-secondary"> <i className="bi-arrow-left-circle"></i>
					Return</Button>
			</div>
			<div className="col-md-7 col-lg-8">
				<h4>User Information</h4>
				<div>
					<p>
						<strong>First Name:</strong> {userInfo.givenName}
					</p>
					<p>
						<strong>Last Name:</strong> {userInfo.surname}
					</p>
					<p>
						<strong>Email:</strong> {userInfo.email}
					</p>
					<p>
						<strong>Shipping Address:</strong> {userInfo.address}
					</p>
					<p>
						<strong>Address 2:</strong> {userInfo.address2}
					</p>
					<p>
						<strong>Country:</strong> {userInfo.country}
					</p>
					<p>
						<strong>State:</strong> {userInfo.state}
					</p>
					<p>
						<strong>Zip Code:</strong> {userInfo.zipCode}
					</p>
				</div>
			</div>
		</div>
	);
};
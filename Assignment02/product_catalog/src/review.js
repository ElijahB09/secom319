import React from 'react';
import './review.css';
import Button from 'react-bootstrap/Button';

export const renderReview = () => {

	return <div id='review-section' className="card collapse" style={{width: '18rem'}}>
		<div className="card-body">
			<h5 className="card-title">Order summary</h5>
			<p className="card-text">Here is a summary of your order.</p>
		</div>
		<ul className="list-group list-group-flush">

		</ul>
		<Button href="location.reload()" className="btn btn-secondary"> <i className="bi-arrow-left-circle"></i>
			Return</Button>
	</div>;
};
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {processCart, productsInCart} from './shop';
import './products.css';

const render_card = (product, productCounts, addProductToCart) => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	const count = productCounts[product.id] || 0;
	return (
		<Card className="d-flex flex-column" style={{width: '18rem'}}>
			<Card.Img variant="top" alt='Product Image_2' src={product.image}/>
			<Card.Body className="flex-grow-1">
				<Card.Title>{product.title}</Card.Title>
				<Card.Text>
					Some quick example text to build on the card title and make up the
					bulk of the card's content.
				</Card.Text>
				<div>
					<h4 id="product3-price" className="price">{formatter.format(product.price)}</h4>
				</div>
				<div className="input-group input-group-sm">
					<div className="input-group-prepend">
						<Button onClick={() => addProductToCart(product, true)} className="btn"
								variant="primary">+</Button>
					</div>
					<input id={`product-num-${product.id}`} type="text" className="form-control input-sm"
						   value={count}/>
					<div className="input-group-append">
						<Button onClick={() => addProductToCart(product, false)} className="btn"
								variant="primary">-</Button>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
}

export const renderProducts = (products, productCounts, addProductToCart) => {
	return <div className='category-section fixed'>
		<div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10"
			 style={{
				 height: 'auto', overflowY: 'scroll'
			 }}>
			<Row xs={1} md={4} className="g-4">
				{products.map((product) => (
					<div key={product.id}>
						<Col>
							{render_card(product, productCounts, addProductToCart)}
						</Col>
					</div>
				))}
			</Row>
		</div>
	</div>
}

export const RenderProductPage = (products) => {

	const [cartCount, setCartCount] = useState(0);
	const [productCounts, setProductCounts] = useState({});

	const addProductToCart = (product, isAdd) => {
		const currentCount = productCounts[product.id] || 0;
		if (isAdd) {
			setCartCount(cartCount + 1);
			setProductCounts({
				...productCounts,
				[product.id]: currentCount + 1,
			});
			productsInCart.push(product);
		} else {
			const index = productsInCart.indexOf(product);
			if (index !== -1) {
				productsInCart.splice(index, 1);
				setCartCount(cartCount - 1);
				setProductCounts({
					...productCounts,
					[product.id]: currentCount - 1,
				});
			}
		}

	}

	return <div className="col-md-11 ms-sm-auto col-lg-12 px-md-4">
		<div
			className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
			<h1 className="h2">Product Catalog</h1>

			<div className="btn-toolbar mb-2 mb-md-0">
				<button id="cart-button" type="button"
						className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
						onClick={processCart}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
						 className="bi bi-cart" viewBox="0 0 16 16">
						<path
							d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
					</svg>
					Cart
					<span id="cart-count"><strong>{cartCount}</strong></span>
				</button>
			</div>
		</div>

		<div id='product-catalog' className="flex fixed flex-row">
			<div className="ml-5 p-10 xl:basis-4/5">
				{renderProducts(products, productCounts, addProductToCart)}
			</div>
		</div>
	</div>
}
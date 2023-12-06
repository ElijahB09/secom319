import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {Col, Modal, Row} from 'react-bootstrap';
import {formatter, productsInCart} from './shop';
import './products.css';
import AddProductForm from './AddProductForm';
import {createProduct} from './services/api';

const render_card = (product, productCounts, addProductToCart) => {
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

	const [productCounts, setProductCounts] = useState({});
	const [searchQuery, setSearchQuery] = useState('');
	const [showPostProduct, setPostProduct] = useState(false);

	const addProductToCart = (product, isAdd) => {
		const currentCount = productCounts[product.id] || 0;
		if (isAdd) {
			setProductCounts({
				...productCounts,
				[product.id]: currentCount + 1,
			});
			if (productsInCart.indexOf(product) === -1) {
				product['quantity'] = 1;
				productsInCart.push(product);

			} else {
				const item = productsInCart.find((item) => product.id === item.id);
				item['quantity'] = item.quantity + 1;
			}

		} else {
			const index = productsInCart.indexOf(product);
			if (index !== -1) {
				setProductCounts({
					...productCounts,
					[product.id]: currentCount - 1,
				});
				product['quantity'] -= 1;
				if (product.quantity === 0) {
					productsInCart.splice(index, 1);
				}
			}
		}
		console.log(productsInCart);
	}

	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleAddProduct = async (newProduct) => {
		const formattedData = {
			id: newProduct.id,
			title: newProduct.title,
			price: newProduct.price,
			description: newProduct.description,
			category: newProduct.category,
			image: newProduct.image,
			rating: {
				rate: newProduct.rate,
				count: newProduct.count
			}
		}

		const createdProduct = await createProduct(formattedData);
		console.log('Adding product:', createdProduct);

		window.location.reload();

		// Add your logic to update the product list or perform any necessary actions
		setPostProduct(false);
	};

	console.log(showPostProduct);

	return <div className="col-md-11 ms-sm-auto col-lg-12 px-md-4">
		<div
			className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
			<h1 className="h2">Product Catalog</h1>

			<div className="search-bar-container">
				<input
					className="search-input"
					type="text"
					placeholder="Search products"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<div className="btn-toolbar mb-2 mb-md-0">
				<button id="cart-button" type="button"
						className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
						onClick={() => setPostProduct(!showPostProduct)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
						 className="bi bi-plus-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
						<path
							d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
					</svg>
					Add Product
				</button>
			</div>
		</div>

		<div id='product-catalog' className="flex fixed flex-row">
			<div className="ml-5 p-10 xl:basis-4/5">
				{renderProducts(filteredProducts, productCounts, addProductToCart)}
			</div>
		</div>
		{showPostProduct && (
			<Modal show={showPostProduct} onHide={() => setPostProduct(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddProductForm
						onAddProduct={handleAddProduct}
						onCancel={() => setPostProduct(false)}
					/>
				</Modal.Body>
			</Modal>
		)}
	</div>
}
import React, {useEffect, useState} from 'react';
import './shop.css';
import {RenderProductPage} from './products';
import RenderCheckout from './RenderCheckout';
import {renderReview} from './review';
import {fetchProducts} from './services/api';

export const productsInCart = [];
export let user = {};

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export const processCart = (items) => {
	const productCatalog = document.getElementById('product-catalog');
	const checkoutSection = document.getElementById('checkout-section');
	const userInputSection = document.getElementById('user-input-section');
	productCatalog.classList.add('collapse');
	checkoutSection.classList.remove('collapse');
	userInputSection.classList.remove('collapse');
}

export const loadReviewPage = (userInfo) => {
	const checkoutSection = document.getElementById('checkout-section');
	const userInputSection = document.getElementById('user-input-section');
	const reviewSection = document.getElementById('review-section');
	checkoutSection.classList.add('collapse');
	userInputSection.classList.add('collapse');
	reviewSection.classList.remove('collapse');
	user = userInfo;
	renderReview(user);
}


const Shop = () => {
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState({
		givenName: '',
		surname: '',
		email: '',
		address: '',
		address2: '',
		country: '',
		state: '',
		zipCode: '',
		creditCardName: '',
		creditCardNum: '',
		creditCardExp: '',
		creditCardCCV: '',
	});

	useEffect(() => {
		const fetchDataFromApi = async () => {
			try {
				let data = await fetchProducts();
				setProducts(data);
			} catch (error) {
				console.log("Error");
			}
		};

		fetchDataFromApi().then(() => {
			console.log(products);
		});
	}, []);


	return <div>
		{RenderProductPage(products)}
		{RenderCheckout(user, setUser)}
		{renderReview(user)}
	</div>
};

export default Shop;
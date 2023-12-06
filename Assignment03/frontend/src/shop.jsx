import React, {useEffect, useState} from 'react';
import './shop.css';
import {RenderProductPage} from './products';
import {fetchProducts} from './services/api';

export const productsInCart = [];
export let user = {};

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

const Shop = () => {
	const [products, setProducts] = useState([]);
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
	</div>
};

export default Shop;
let cartCountElement = document.getElementById('cart-count');
let cartCount = 0;
let addToCartButtons = document.getElementsByClassName('.add-to-cart');
let addCartContainer = document.getElementById('cart-container');
let cartButton = document.getElementById('cart-button');
const cartProductIds = [];

addCartContainer.addEventListener('click', function (event) {
	if (event.target.classList.contains('add-to-cart')) {
		const productId = event.target.getAttribute('data-product-id');
		if (productId === 'product1') {
			cartProductIds.push({name: `${productId}`, description: 'Description Here', price: '44.99'});
		} else if (productId === 'product2') {
			cartProductIds.push({name: `${productId}`, description: 'Description Here', price: '39.99'});
		} else if (productId === 'product3') {
			cartProductIds.push({name: `${productId}`, description: 'Description Here', price: '29.99'});
		}
		cartCount++;
		cartCountElement.textContent = cartCount;
		cartCountElement.style.fontWeight = 'bold';
		// addToCart(productId);
	}
});

cartButton.addEventListener('click', function (event) {
	const productsJSON = JSON.stringify(cartProductIds);
	const encodedProducts = encodeURIComponent(productsJSON);
	window.location.href = `checkout.html?products=${encodedProducts}`;
});

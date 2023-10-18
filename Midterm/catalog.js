let cartCountElement = document.getElementById('cart-count');
let cartCount = 0;
let addToCartButtons = document.getElementsByClassName('.add-to-cart');
let addCartContainer = document.getElementById('cart-container');
let cartButton = document.getElementById('cart-button');
const cartProductIds = [];

addCartContainer.addEventListener('click', function (event) {
	if (event.target.classList.contains('add-to-cart')) {
		const productId = event.target.getAttribute('data-product-id');
		cartProductIds.push({name: `${productId}`, description: 'Description Here', price: '10'});
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

let cartCountElement = document.getElementById('cart-count');
let cartCount = 0;
let addToCartButtons = document.getElementsByClassName('.add-to-cart');
let cartContainer = document.getElementById('cart-container');

cartContainer.addEventListener('click', function (event) {
	if(event.target.classList.contains('add-to-cart')) {
		const productId = event.target.getAttribute('data-product-id');
		console.log(productId);
		cartCount++;
		cartCountElement.textContent = cartCount;
		cartCountElement.style.fontWeight = 'bold';
		// addToCart(productId);
	}
});

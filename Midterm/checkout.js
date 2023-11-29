let data1 = {
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	billing_address: {
		address: '',
		address2: '',
		country: '',
		state: '',
		zip: '',
	},
	same_address: 'false',
	save_info: 'false',
	billing_data: {
		paymentMethod: 'Credit card',
		cc_name: '',
		cc_number: '',
		cc_expiration: '',
		cc_cvv: '',
	}
};

let addressData = [
	'address',
	'address2',
	'country',
	'state',
	'zip'
];

let billingData = [
	'paymentMethod',
	'cc_name',
	'cc_number',
	'cc_expiration',
	'cc_cvv',
];

let paymentMethod = [
	'credit',
	'debit',
	'paypal'
];

const cartCount = document.getElementById('cart-count');
const productList = document.getElementById('product-list');
const redeemButton = document.getElementById('redeem-button');
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let products;

if (params.products) {
	const decodedProducts = decodeURIComponent(params.products);
	products = JSON.parse(decodedProducts);
	console.log(products);
} else if(!products) {
	console.log('No products found in URL.');
}
cartCount.innerHTML = products.length;
products?.forEach(product => {
	const listItem = document.createElement('li');
	listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

	listItem.innerHTML = `
	  <div>
      	<h6 class="my-0">${product.name}</h6>
      	<small class="text-body-secondary">${product.description}</small>
      </div>
      <span class="text-body-secondary">$${product.price}</span>`;

	productList.appendChild(listItem);
});

redeemButton.addEventListener('click', () => {
	const input = document.getElementById('redeem-input');
	const listItem = document.createElement('li');
	listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');

	listItem.innerHTML = `
	  <div class="text-success">
        <h6 class="my-0">Promo code</h6>
        <small>${input.value}</small>
      </div>
      <span class="text-success">−$5</span>`;

	productList.appendChild(listItem);
	input.value = '';
});

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation');

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
	form.addEventListener('submit', event => {
		if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		}

		// form.classList.add('was-validated')
		const inputElements = form.querySelectorAll('input');

		// Iterate over the input elements and get their values
		inputElements.forEach(inputElement => {
			const inputValue = inputElement.value;
			if (addressData.includes(inputElement.id)) {
				data.billing_address[inputElement.id] = inputValue;
			} else if (billingData.includes(inputElement.id)) {
				data.billing_data[inputElement.id] = inputValue;
			} else if (paymentMethod.includes(inputElement.id)) {
				if (inputElement.checked) {
					data.billing_data.paymentMethod = inputElement.id;
				}
			} else {
				data[inputElement.id] = inputValue;
			}
		});
		console.log(JSON.stringify(data));
		window.location.href = 'index.html';
	}, false)
});


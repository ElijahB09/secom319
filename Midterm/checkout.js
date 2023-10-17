let data = {
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

// Example starter JavaScript for disabling form submissions if there are invalid fields

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
	form.addEventListener('submit', event => {
		if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		}

		form.classList.add('was-validated')
		const inputElements = form.querySelectorAll('input');

		// Iterate over the input elements and get their values
		inputElements.forEach(inputElement => {
			const inputValue = inputElement.value;
			if (addressData.includes(inputElement.id)) {
				data.billing_address[inputElement.id] = inputValue;
			} else if (billingData.includes(inputElement.id)) {
				data.billing_data[inputElement.id] = inputValue;
			} else if (paymentMethod.includes(inputElement.id)) {
				if(inputElement.checked) {
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


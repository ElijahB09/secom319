import {useEffect, useState} from 'react';
import './App.css';
import {fetchProducts} from './services/api';

function App() {
	const [productData, setProductData] = useState([]);


	useEffect(() => {
		const fetchDataFromApi = async () => {
			try {
				let data = await fetchProducts();
				setProductData(data);
			} catch (error) {
				console.log("Error");
			}
		};

		fetchDataFromApi().then(() => {
			console.log(productData);
		});
	}, []);
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.

				</p>
			</header>
		</div>
	);
}

export default App;

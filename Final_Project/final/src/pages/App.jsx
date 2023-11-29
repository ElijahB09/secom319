import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import Header from '../components/Header';
import Overview from './Overview';
import {useState} from 'react';

function App() {
	const [searchVisible, setSearchVisible] = useState(true);
	return (
		<div className="App app-container" style={{background: '#336699'}}>
			<Header searchVisible={searchVisible}/>
			<div className="container-fluid" style={{height: '100vh'}}>
				<main className="col-md-8 col-lg-12 px-md-5">
					<Overview setSearchVisible={setSearchVisible}/>
				</main>
			</div>
		</div>
	);
}

export default App;

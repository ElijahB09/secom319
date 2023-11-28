import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import Header from '../components/Header';
import Overview from './Overview';

function App() {
	return (
		<div className="App" style={{background: '#336699'}}>
			<Header/>

			<div className="container-fluid" style={{height: '100vh'}}>
				<Overview/>
			</div>
		</div>
	);
}

export default App;

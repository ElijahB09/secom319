import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import Header from '../components/Header';
import Overview from './Overview';

function App() {
	return (
		<div className="App app-container" style={{background: '#336699'}}>
			<Header/>
			<div className="container-fluid" style={{height: '100vh'}}>
				<main className="col-md-8 col-lg-12 px-md-5">
					<Overview/>
				</main>
			</div>
		</div>
	);
}

export default App;

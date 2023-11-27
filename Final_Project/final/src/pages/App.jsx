import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Overview from './Overview';

function App() {
	return (
		<div className="App">
			<Header/>
			<div className="container-fluid">
				<div className="row">
					<Sidebar/>
					<Overview/>
				</div>
			</div>
		</div>
	);
}

export default App;

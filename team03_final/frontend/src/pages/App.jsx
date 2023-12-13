import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import Header from '../components/Header';
import Overview from './Overview';
import {useState} from 'react';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};


function App() {
	const [searchVisible, setSearchVisible] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [showOverview, setShowOverview] = useState(true);
	const [aboutUs, setAboutUs] = useState(false);

	const addRoomOnClick = () => {
		setModalVisible(true);
	};

	const showAboutUs = () => {
		setShowOverview(false);
		setAboutUs(true);
	}

	return (
		<div className="App app-container" style={{background: '#336699'}}>
			<Header searchVisible={searchVisible} addRoomOnClick={addRoomOnClick} showAboutUs={showAboutUs}
					showModal={showOverview}/>
			<div className="container-fluid" style={{height: 'fit-content', paddingBottom: "50px", minHeight: '100vh'}}>
				<main className="col-md-8 col-lg-12 px-md-5">
					{showOverview && <Overview
						setSearchVisible={setSearchVisible}
						roomModalVisible={modalVisible}
						setRoomModalVisible={setModalVisible}/>}
					{aboutUs &&
						<div className="about-us-container d-flex align-items-center justify-content-center">
							<div style={{
								background: '#6c757d',
								borderRadius: '10px',
								boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
								padding: '20px',
								margin: '10px',
								width: '48%'
							}}>
								<h1 style={{marginTop: "25px"}}>SE/COMS319 Construction of User Interfaces, Fall
									2023</h1>
							</div>
							<div style={{
								background: '#6c757d',
								borderRadius: '10px',
								boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
								padding: '20px',
								margin: '10px',
								width: '48%'
							}}>
								<h2>{(new Date()).toLocaleDateString()}</h2>
							</div>
							<div style={{
								background: '#6c757d',
								borderRadius: '10px',
								boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
								padding: '20px',
								margin: '10px',
								width: '48%'
							}}>
								<h3>Sam McGrath: sgm@iastate.edu</h3>
								<h3>Elijah Brady: ebrady@iastate.edu</h3>
							</div>
						</div>
					}
				</main>
			</div>
		</div>
	);
}

export default App;

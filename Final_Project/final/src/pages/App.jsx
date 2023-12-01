import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import Header from '../components/Header';
import Overview from './Overview';
import {useState} from 'react';
import ModalComp from '../components/ModalComp';

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

	const addRoomOnClick = () => {
		console.log("hello");
		setModalVisible(true);
	};

	return (
		<div className="App app-container" style={{background: '#336699'}}>
			<Header searchVisible={searchVisible} addRoomOnClick={addRoomOnClick}/>
			<div className="container-fluid" style={{height: 'fit-content', paddingBottom:"50px", minHeight: '100vh'}}>
				<main className="col-md-8 col-lg-12 px-md-5">
					<ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible}/>
					<Overview setSearchVisible={setSearchVisible}/>
				</main>
			</div>
		</div>
	);
}

export default App;

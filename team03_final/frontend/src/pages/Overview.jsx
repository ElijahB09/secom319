import {useEffect, useState} from 'react';
import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import CardComp from '../components/CardComp';
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import LineChart from '../components/LineChart';
import ToDoCard from '../components/ToDoCard';
import {fetchPatients, fetchRooms} from '../services/api';
import ModalComp from '../components/ModalComp';
import TaskModal from '../components/TaskModal';

Chart.register(CategoryScale);

const placeHolder_TempData = [
	68,
	70,
	71
];

const placeHolder_HumidData = [
	35,
	40,
	41
];

function Overview(props) {
	const [roomId, setRoomId] = useState();
	const [room, setRoom] = useState();
	const [roomData, setRoomData] = useState([]);
	const [patientData, setPatientData] = useState([]);
	const [cardOverviewVisible, setCardOverviewVisible] = useState(true);
	const [roomViewVisible, setRoomViewVisible] = useState(false);
	const [taskModalVisible, setTaskModalVisible] = useState(false);
	const [tempChartData, setTempChartData] = useState({
			labels: placeHolder_TempData.map((data, index) => index),
			datasets: [
				{
					label: "Temperature (°F) ",
					data: placeHolder_TempData.map((data) => data),
					backgroundColor: [
						"#66CCFF"
					],
					borderColor: "#4CAF50",
					borderWidth: 2
				}
			]
		}
	);
	const [humidityChartData, setHumidityChartData] = useState({
		labels: placeHolder_HumidData.map((data, index) => index),
		datasets: [
			{
				label: "Humidity % ",
				data: placeHolder_HumidData.map((data) => data),
				backgroundColor: ["#66CCFF"],
				borderColor: "#4CAF50",
				borderWidth: 2
			}
		]
	});

	useEffect(() => {
		const fetchDataFromApi = async () => {
			try {
				let data = await fetchRooms();
				setRoomData(data);
				data = await fetchPatients();
				setPatientData(data);
			} catch (error) {
				console.log("Error");
			}
		};

		fetchDataFromApi().then(() => {
			console.log(roomData);
			console.log(patientData);
		});
	}, []);

	const updateRoomsAndPatients = async () => {
		try {
			const roomsData = await fetchRooms();
			const patientsData = await fetchPatients();
			setRoomData(roomsData);
			setPatientData(patientsData);
		} catch (error) {
			console.log("Error updating rooms and patients:", error);
		}
	};


	console.log(roomData);
	console.log(patientData);

	// console.log(roomData);
	// console.log(patientData);

	const handleCardClick = (roomId) => {
		console.log(roomId);
		setRoomId(roomId);
		setCardOverviewVisible(!cardOverviewVisible);
		props.setSearchVisible(!cardOverviewVisible);
		setRoomViewVisible(!roomViewVisible);
		setRoom(roomData.find((room) => (room.id === roomId)));
		room && setTempChartData({
			labels: room.climate?.past_temps_f.map((data, index) => index),
			datasets: [
				{
					label: "Users Gained ",
					data: roomData[roomId].climate?.past_temps_f.map((data) => data),
					backgroundColor: [
						"#66CCFF"
					],
					borderColor: "#4CAF50",
					borderWidth: 2
				}
			]
		});
		room && setHumidityChartData({
			labels: room.climate?.past_humidities.map((data, index) => index),
			datasets: [
				{
					data: roomData[roomId].climate?.past_humidities.map((data) => data),
					backgroundColor: ["#cecfcf"],
					borderColor: "#cecfcf",
					borderWidth: 2
				}
			]
		});
	};

	const renderCards = () => {
		const cardsPerRow = 3;
		const rows = [];

		for (let i = 0; i < roomData.length; i += cardsPerRow) {
			const rowCards = roomData.slice(i, i + cardsPerRow);

			const row = (
				<div className="row justify-content-center" key={i / cardsPerRow}>
					{rowCards.map((room, index) => {
						const patient = patientData.find((patient) => patient.id === room.patient);
						return (
							<div className="col-md-4" key={index}>
								<CardComp room={room} patient={patient} onClick={handleCardClick}/>
							</div>
						)
					})}
				</div>
			);
			rows.push(row);
		}
		return rows;
	}

	return (
		<>
			{cardOverviewVisible && (
				<div id="card-overview" className="container-fluid">
					<div className="row justify-content-center">
						{renderCards()}
					</div>
				</div>
			)}
			{roomViewVisible && (
				<div id="card-view">
					<div className='d-flex justify-content-center'>
						<div className="current-label" style={{
							background: '#6c757d',
							borderRadius: '10px',
							padding: '20px',
							margin: '10px',
							width: 'fit-content',
							textAlign: 'center'
						}}>
							<h1>Room: {room.room_num}</h1>
							<h2>Patient: {patientData.find((patient) => patient.id === room.patient).name}</h2>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6" style={{
							background: '#6c757d',
							borderRadius: '10px',
							boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
							padding: '20px',
							margin: '10px',
							width: '48%'
						}}>
							<LineChart chartData={tempChartData} title={"Temperature Recording"}/>
							<div className="temperature-info mt-3">
								<p className="current-label"><strong>Current
									Temperature:</strong> {room.climate.current_temp_f}°F</p>
								<p className="current-label"><strong>Ideal
									Temperature:</strong> {patientData.find((patient) => patient.id === room.patient).ideal_temp}°F
								</p>
							</div>
						</div>
						<div className="col-md-6" style={{
							background: '#6c757d',
							borderRadius: '10px',
							padding: '20px',
							margin: '10px',
							width: '48%'
						}}>
							<LineChart chartData={humidityChartData} title={"Humidity Recording"}/>
							<div className="humidity-info mt-3">
								<p className="current-label"><strong>Current
									Humidity:</strong> {room.climate.current_humidity}%</p>
								<p className="current-label"><strong>Ideal
									Humidity:</strong> {patientData.find((patient) => patient.id === room.patient).ideal_humidity}%
								</p>
							</div>
						</div>
					</div>

					{/* Room To-Do Section */}
					<div className="room-todo-section d-flex justify-content-center" style={{textAlign: 'center'}}>
						<ToDoCard
							events={patientData.find((patient) => patient.id === room.patient).calendar?.events}
							setModalVisible={setTaskModalVisible}
						/>
					</div>
				</div>
			)}
			<TaskModal
				events={patientData.find((patient) => patient.id === room?.patient)?.calendar?.events}
				patientId={patientData.find((patient) => patient.id === room?.patient)?.id}
				updateRoomsAndPatients={updateRoomsAndPatients}
				modalVisible={taskModalVisible}
				setModalVisible={setTaskModalVisible}/>
			<ModalComp modalVisible={props.roomModalVisible} setModalVisible={props.setRoomModalVisible}
					   updateRoomsAndPatients={updateRoomsAndPatients}/>
		</>
	);
}

export default Overview;

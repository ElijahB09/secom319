import {useEffect, useState} from 'react';
import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import CardComp from '../components/CardComp';
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {Data} from '../utils/Data';
import LineChart from '../components/LineChart';
import ToDoCard from '../components/ToDoCard';
import {fetchPatients, fetchRooms} from '../services/api';
import ModalComp from '../components/ModalComp';

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
	const [tempChartData, setTempChartData] = useState({
			labels: placeHolder_TempData.map((data, index) => index),
			datasets: [
				{
					label: "Users Gained ",
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
				label: "Users Gained ",
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
					label: "Users Gained ",
					data: roomData[roomId].climate?.past_humidities.map((data) => data),
					backgroundColor: ["#66CCFF"],
					borderColor: "#4CAF50",
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
					<h1>Room: {room.room_num}</h1>
					<h2>Patient: {patientData.find((patient) => patient.id === room.patient).name}</h2>
					<div className="row">
						<LineChart chartData={tempChartData} title={"Temperature Recording"}/>
						<LineChart chartData={humidityChartData} title={"Humidity Recording"}/>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="temperature-info">
								<p>Current Temperature: 68°F</p>
								<p>Average Deviation: 3°F</p>
							</div>
						</div>
						<div className="col-md-6">
							<div className="humidity-info">
								<p>Current Humidity: 20%</p>
								<p>Average Deviation: 2%</p>
							</div>
						</div>
					</div>

					{/* Room To-Do Section */}
					<div className="room-todo-section d-flex justify-content-center" style={{textAlign: 'center'}}>
						<ToDoCard events={patientData.find((patient) => patient.id === room.patient).calendar?.events}/>
					</div>
				</div>
			)}
			<ModalComp modalVisible={props.modalVisible} setModalVisible={props.setModalVisible} updateRoomsAndPatients={updateRoomsAndPatients}/>
		</>
	);
}

export default Overview;

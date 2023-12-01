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

Chart.register(CategoryScale);

function Overview(props) {
	const [roomData, setRoomData] = useState([]);
	const [patientData, setPatientData] = useState([]);
	const [cardOverviewVisible, setCardOverviewVisible] = useState(true);
	const [roomViewVisible, setRoomViewVisible] = useState(false);

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

	console.log(roomData);
	console.log(patientData);

	const [chartData, setChartData] = useState({
		labels: Data.map((data) => data.year),
		datasets: [
			{
				label: "Users Gained ",
				data: Data.map((data) => data.userGain),
				backgroundColor: [
					"#66CCFF"
				],
				borderColor: "#4CAF50",
				borderWidth: 2
			}
		]
	});

	const handleCardClick = () => {
		setCardOverviewVisible(!cardOverviewVisible);
		props.setSearchVisible(!cardOverviewVisible);
		setRoomViewVisible(!roomViewVisible);
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
					<h1>ROOM 1</h1>
					<div className="row">
						<LineChart chartData={chartData} title={"Temperature Recording"}/>
						<LineChart chartData={chartData} title={"Humidity Recording"}/>
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
						<ToDoCard/>
					</div>
				</div>
			)}
		</>
	);
}

export default Overview;

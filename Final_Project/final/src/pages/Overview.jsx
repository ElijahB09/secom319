import {useState} from 'react';
import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import CardComp from '../components/CardComp';
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {Data} from '../utils/Data';
import LineChart from '../components/LineChart';
import ToDoCard from '../components/ToDoCard';

Chart.register(CategoryScale);

const room_data = [
	{
		"id": 1,
		"created_at": "2023-11-27T16:06:30.08255+00:00",
		"climate": {
			"past_temps_c": {},
			"past_temps_f": {},
			"current_temp_c": 26,
			"current_temp_f": 65,
			"past_humidities": {},
			"current_humidity": 35
		},
		"room_num": 1,
		"patient": 1
	},
	{
		"id": 2,
		"created_at": "2023-11-27T17:06:30.08255+00:00",
		"climate": {
			"past_temps_c": {},
			"past_temps_f": {},
			"current_temp_c": 26,
			"current_temp_f": 70,
			"past_humidities": {},
			"current_humidity": 40
		},
		"room_num": 2,
		"patient": 2
	},
	{
		"id": 3,
		"created_at": "2023-11-27T18:06:30.08255+00:00",
		"climate": {
			"past_temps_c": {},
			"past_temps_f": {},
			"current_temp_c": 26,
			"current_temp_f": 75,
			"past_humidities": {},
			"current_humidity": 45
		},
		"room_num": 3,
		"patient": 3
	}
];

function Overview(props) {
	const [cardOverviewVisible, setCardOverviewVisible] = useState(true);
	const [roomViewVisible, setRoomViewVisible] = useState(false);

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

		for (let i = 0; i < room_data.length; i += cardsPerRow) {
			const rowCards = room_data.slice(i, i + cardsPerRow);

			const row = (
				<div className="row justify-content-center" key={i / cardsPerRow}>
					{rowCards.map((room, index) => (
						<div className="col-md-4" key={index}>
							<CardComp room={room} onClick={handleCardClick}/>
						</div>
					))}
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

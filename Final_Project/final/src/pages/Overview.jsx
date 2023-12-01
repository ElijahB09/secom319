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

	return (
		<>
			{cardOverviewVisible && (
				<div id="card-overview" className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-md-4">
							<CardComp title={'Room 1'} temp={'72'} humidity={'35'} onClick={handleCardClick}/>
						</div>
						<div className="col-md-4">
							<CardComp title={'Room 2'} temp={'68'} humidity={'38'} onClick={handleCardClick}/>
						</div>
						<div className="col-md-4">
							<CardComp title={'Room 3'} temp={'71'} humidity={'36'} onClick={handleCardClick}/>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-md-4">
							<CardComp title={'Room 1'} temp={'72'} humidity={'35'} onClick={handleCardClick}/>
						</div>
						<div className="col-md-4">
							<CardComp title={'Room 2'} temp={'68'} humidity={'38'} onClick={handleCardClick}/>
						</div>
						<div className="col-md-4">
							<CardComp title={'Room 3'} temp={'71'} humidity={'36'} onClick={handleCardClick}/>
						</div>
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

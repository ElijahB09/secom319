import {useRef, useState} from 'react';
import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import CardComp from '../components/CardComp';
import SimpleGraph from '../components/SimpleGraph'; // Import the SimpleGraph component



function Overview() {
	const [cardOverviewVisible, setCardOverviewVisible] = useState(true);
	const [roomViewVisible, setRoomViewVisible] = useState(false);

	const handleCardClick = () => {
		setCardOverviewVisible(!cardOverviewVisible);
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
					<SimpleGraph />
				</div>
			)}
		</>
	);
}

export default Overview;

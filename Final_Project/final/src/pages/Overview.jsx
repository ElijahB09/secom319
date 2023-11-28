import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import CardComp from '../components/CardComp';

function Overview() {
	return (
		<main className="col-md-8 col-lg-12 px-md-5">
			<div className="container-fluid">
				<div className="row" style={{justifyContent: 'center'}}>
					<CardComp hasTabs={0} title={'Room 1'} temp={'72'} humidity={'35'}/>
					<CardComp hasTabs={0} title={'Room 2'} temp={'68'} humidity={'38'}/>
					<CardComp hasTabs={0} title={'Room 3'} temp={'71'} humidity={'36'}/>
				</div>
			</div>
		</main>
	);
}

export default Overview;

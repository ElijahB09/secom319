import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import CardComp from '../components/CardComp';

function Overview() {
	return (
		<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
			<div
				className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h1 className="h2">Home Temperature</h1>

			</div>

			<div className="container-fluid">
				<div className="row" style={{justifyContent: 'center'}}>
					<CardComp title={'Room 1'} text={'peace out'}/>
					<CardComp title={'Room 2'} text={'peace out'}/>
					<CardComp title={'Room 3'} text={'peace out'}/>
				</div>
			</div>
		</main>
	);
}

export default Overview;

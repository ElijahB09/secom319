import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import {Button, Nav, Navbar} from 'react-bootstrap';

function Header(props) {
	return (

		<Navbar id="nav-buttons-wrapp" bg="dark" variant="dark" expand="lg">

			<Navbar.Brand id="title">M-C Brady Tech</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link id="nav-dashboard" href=".">Dashboard</Nav.Link>
				<Nav.Link id="nav-dashboard" onClick={() => props.showAboutUs()}>About Us</Nav.Link>
				{props.showModal && <Button style={{marginLeft:'75px'}} onClick={() => props.addRoomOnClick()}>Add Patient</Button>}
			</Nav>
			{/*{props.searchVisible && (*/}
			{/*	<Form id="nav-form" style={{width: "65%"}}>*/}
			{/*		<FormControl id="nav-search" type="text" placeholder="Search" className="mr-sm-2"*/}
			{/*					 style={{width: "20%"}}/>*/}
			{/*	</Form>*/}
			{/*)}*/}

		</Navbar>

	);
}

export default Header;

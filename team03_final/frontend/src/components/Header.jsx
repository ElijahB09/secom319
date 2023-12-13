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
		</Navbar>
	);
}

export default Header;

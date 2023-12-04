import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import {Nav} from 'react-bootstrap';

function NavBarComp() {
	return (
		<Nav variant="underline" defaultActiveKey="/home">
			<Nav.Item>
				<Nav.Link href="/home">Active</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="link-1">Option 2</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="disabled" disabled>
					Disabled
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}

export default NavBarComp;

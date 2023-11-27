import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';

function CardComp(props) {
	return (
		<Card style={{ width: '20rem', margin: '15px'}}>
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>
					{props.text}
				</Card.Text>
				<Button variant="primary">Go somewhere</Button>
			</Card.Body>
		</Card>
	);
}

export default CardComp;

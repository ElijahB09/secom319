import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import Card from 'react-bootstrap/Card';
import {Button, Nav} from 'react-bootstrap';
import {useState} from 'react';

const RenderCardTabs = (props) => {
	return <Card.Header>
		<Nav variant="tabs" defaultActiveKey="#room-details" onSelect={props.onTabClick}>
			<Nav.Item>
				<Nav.Link href="#room-details" onSelect={() => props.onTabClick('#room-details')}>Room Details</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="#todo-list" onSelect={() => props.onTabClick('#todo-list')}>To Do List</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="#patient-info" onSelect={() => props.onTabClick('#patient-info')}>Patient Info</Nav.Link>
			</Nav.Item>
		</Nav>
	</Card.Header>
};

function CardComp(props) {
	const [activeTab, setActiveTab] = useState('#room-details');

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const renderContent = () => {
		switch (activeTab) {
			case '#room-details':
				return (
					<>
						<Card.Text>
							Temperature: {props.temp}°
						</Card.Text>
						<Card.Text>
							Humidity: {props.humidity}%
						</Card.Text>
					</>
				);
			case '#todo-list':
				return (
					<>
						<Card.Text><strong>9am</strong>: Administer Morning Medication</Card.Text>
						<Card.Text><strong>11am</strong>: Lunch Time</Card.Text>
						<Card.Text><strong>4pm</strong>: Administer Afternoon Medication</Card.Text>
						<Card.Text><strong>7pm</strong>: Dinner Time</Card.Text>
					</>
				);
			case '#patient-info':
				return (
					<>
						<Card.Text><strong>Name</strong>: Dr. Doofenshmurtzs</Card.Text>
						<Card.Text><strong>DOB</strong>: 04/20/1992</Card.Text>
						<Card.Text><strong>Description</strong>: In the land of poets and thinkers, where the Brothers Grimm spun their tales, find me where the Rhine River winds and the cuckoo's song prevails. Where am I, born of ancient lore, where pretzels twist and legends soar?</Card.Text>
					</>
				);
			default:
				return (
					<>
						<Card.Text>No Tab Card Content</Card.Text>
					</>
				);
		}
	};

	const cardHead = (!props.noTabs) ? <RenderCardTabs onTabClick={handleTabClick} /> : <></>;

	return (
		<Card style={{width: '25rem', margin: '15px', backgroundColor: '#FFFFFF'}}>
			{cardHead}
			<Card.Body>
				<Card.Title style={{color: '#336699'}}>{props.title}</Card.Title>
				{renderContent()}
				<Button variant="primary" onClick={() => props.onClick()}>View Room</Button>
			</Card.Body>
		</Card>
	);
}

export default CardComp;

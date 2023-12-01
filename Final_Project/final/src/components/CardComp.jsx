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
							Temperature: {props.room.climate?.current_temp_f}°
						</Card.Text>
						<Card.Text>
							Humidity: {props.room.climate?.current_humidity}%
						</Card.Text>
					</>
				);
			case '#todo-list':
				return props.patient.calendar?.events.map((event, index) => {
					const [time, task] = event.split(':');
					return (
						<Card.Text key={index}>
							<strong>{time}</strong>: {task}
						</Card.Text>
					);
				});
			case '#patient-info':
				return (
					<>
						<Card.Text><strong>Name</strong>: {props.patient?.name}</Card.Text>
						<Card.Text><strong>Age</strong>: {props.patient?.age}</Card.Text>
						<Card.Text><strong>Description</strong>: {props.patient?.information}</Card.Text>
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
				<Card.Title style={{color: '#336699'}}>Room {props.room.room_num}</Card.Title>
				{renderContent()}
				<Button variant="primary" onClick={() => props.onClick(props.room.id)}>View Room</Button>
			</Card.Body>
		</Card>
	);
}

export default CardComp;

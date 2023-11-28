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
		console.log("Hello");
		setActiveTab(tab);
	};

	const renderContent = () => {
		switch (activeTab) {
			case '#room-details':
				return (
					<>
						<Card.Text>Room Details Content</Card.Text>
					</>
				);
			case '#todo-list':
				return (
					<>
						<Card.Text>To Do List Content</Card.Text>
					</>
				);
			case '#patient-info':
				return (
					<>
						<Card.Text>Patient info Content</Card.Text>
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

	const cardHead = <RenderCardTabs onTabClick={handleTabClick} />;

	return (
		<Card style={{width: '25rem', margin: '15px', backgroundColor: '#FFFFFF'}}>
			{cardHead}
			<Card.Body>
				<Card.Title style={{color: '#336699'}}>{props.title}</Card.Title>
				{renderContent()}
				<Button variant="primary">Go somewhere</Button>
			</Card.Body>
		</Card>
	);
}

export default CardComp;

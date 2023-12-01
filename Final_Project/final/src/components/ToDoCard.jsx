import Card from 'react-bootstrap/Card';

function ToDoCard() {
	return (
		<>
			{[
				'Secondary',
			].map((variant) => (
				<Card
					id='todo_card'
					bg='secondary'
					key='secondary'
					text='white'
					className="mb-2"
					style={{marginTop: '50px', width: 'fit-content', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)'}}
				>
					<Card.Body>
						<Card.Title>{variant} Room To Do </Card.Title>
						<Card.Text>
							<div className="d-flex justify-content-center" style={{textAlign: "start"}}>
								<ul>
									<li>Administer medication at 3pm</li>
									<li>Feed lunch</li>
								</ul>
							</div>
						</Card.Text>
					</Card.Body>
				</Card>
			))}
		</>
	);
}

export default ToDoCard;
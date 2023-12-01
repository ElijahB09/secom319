export const fetchRooms = async () => {
	try {
		const response = await fetch('http://localhost:8081/rooms');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error.message);
		throw error;
	}
};

export const fetchPatients = async () => {
	try {
		const response = await fetch('http://localhost:8081/patients');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error.message);
		throw error;
	}
};

export const createPatient = async (patientData) => {
	try {
		const response = await fetch('http://localhost:8081/patients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(patientData),
		});

		if (!response.ok) {
			throw new Error('Failed to create patient');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error creating patient:', error.message);
		throw error;
	}
};
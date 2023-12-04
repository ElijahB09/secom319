import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import {useState} from 'react';
import 'reactjs-popup/dist/index.css';
import {Alert, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {createPatient} from '../services/api';


function ModalComp(props) {
	const [patientName, setPatientName] = useState('');
	const [patientAge, setPatientAge] = useState('');
	const [patientInformation, setPatientInformation] = useState('');
	const [tasks, setTasks] = useState('');
	const [idealTemp, setIdealTemp] = useState('');
	const [idealHumidity, setIdealHumidity] = useState('');

	const handleSave = async () => {
		const formattedData = {
			name: patientName,
			age: parseInt(patientAge),
			information: patientInformation,
			calendar: {
				events: tasks
					.split('\n')
					.map((task) => task.trim())
					.filter((task) => task !== '')
					.map((task) => {
						const formattedTask = task.startsWith('*') ? task.slice(1) : task;
						const [time, taskText] = formattedTask.split(':');
						return `${time}:${taskText.trim()}`;
					}),
			},
			ideal_temp: idealTemp,
			ideal_humidity: idealHumidity
		};

		console.log('Formatted Data:', formattedData);

		try {
			const createdPatient = await createPatient(formattedData);
			console.log('Created Patient:', createdPatient);
			props.updateRoomsAndPatients();
		} catch (error) {
			console.error('Error creating patient:', error.message);
		}

		props.setModalVisible(!props.modalVisible);
	};

	const handleReturn = async () => {
		props.setModalVisible(!props.modalVisible);
	}

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="fade"
				transparent={true}

				visible={props.modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					props.setModalVisible(!props.modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.row}>
							<Text style={styles.label}>Full Name:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => setPatientName(text)}
								placeholder="Patient Name"
							/>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Age:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => setPatientAge(text)}
								placeholder="Patient Age"
							/>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Ideal Temp:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => setIdealTemp(text)}
								placeholder="Set Patient's Ideal Temperature"
							/>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Ideal Humidity:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => setIdealHumidity(text)}
								placeholder="Set Patient's Ideal Humidity"
							/>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Information:</Text>
							<TextInput
								style={[styles.input, styles.multilineInput]}
								onChangeText={(text) => setPatientInformation(text)}
								placeholder="Patient Information"
								multiline
							/>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Tasks:</Text>
							<TextInput
								style={[styles.input, styles.multilineInput]}
								onChangeText={(text) => setTasks(text)}
								placeholder="Enter Tasks: Eg. * 8am: Breakfast"
								multiline
							/>
						</View>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={handleSave}>
							<Text style={styles.textStyle}>Save and Hide Modal</Text>
						</Pressable>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={handleReturn}>
							<Text style={styles.textStyle}>Return</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	},
	label: {
		marginRight: 10,
		minWidth: 100
	},
	input: {
		height: 40,
		margin: 12,
		borderColor: 'gray',
		borderWidth: 1,
		flex: 1,
		padding: 10,
	},
	multilineInput: {
		height: 100,
		textAlignVertical: 'top',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalView: {
		margin: 40,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'stretch',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: 600
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

export default ModalComp;

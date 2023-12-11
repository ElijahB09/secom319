import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import {useState} from 'react';
import 'reactjs-popup/dist/index.css';
import {Alert, Modal, Pressable, Text, TextInput, View} from 'react-native';
import {styles} from './ModalComp';
import {updatePatientCalendar} from '../services/api';

function TaskModal(props) {
	const [taskName, setTaskName] = useState('');
	const [selectedTime, setSelectedTime] = useState('');

	const handleSave = async () => {
		try {
			const newEvent = `${selectedTime}: ${taskName}`;

			const updatedEvents = [...props.events, newEvent];

			const updatedCalendarData = {
				events: updatedEvents,
			};

			await updatePatientCalendar(props.patientId, updatedCalendarData);

			props.setModalVisible(false);
			props.updateRoomsAndPatients();
		} catch (error) {
			console.error('Error saving task:', error.message);
		}
	};

	const handleReturn = async () => {
		props.setModalVisible(!props.modalVisible);
	};

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
							<Text style={styles.label}>Task Name:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => setTaskName(text)}
								placeholder="Task Name"
							/>
						</View>
						<View style={styles.row}>
							<Text style={styles.label}>Time Frame:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => setSelectedTime(text)}
								placeholder="e.g., 10:00 AM - 12:00 PM"
							/>
						</View>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={handleSave}>
							<Text style={styles.textStyle}>Save and Hide Modal</Text>
						</Pressable>
						<Pressable
							style={[styles.button, styles.buttonClose, styles.buttonCancel]}
							onPress={handleReturn}>
							<Text style={styles.textStyle}>Cancel</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default TaskModal;
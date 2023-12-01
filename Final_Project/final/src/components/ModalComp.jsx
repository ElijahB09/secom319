import '../styling/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/dashboard.scss'
import {useState} from 'react';
import 'reactjs-popup/dist/index.css';
import {Alert, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';


function ModalComp(props) {
	const [text, onChangeText] = useState('First Name');

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
							<Text style={styles.label}>Room Name:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => onChangeText(text, 'roomName')}
								placeholder="Enter room name"
							/>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Ideal Temp:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => onChangeText(text, 'idealTemp')}
								placeholder="Enter ideal temperature"
							/>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Ideal Humidity:</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => onChangeText(text, 'idealHumidity')}
								placeholder="Enter ideal humidity"
							/>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Tasks:</Text>
							<TextInput
								style={[styles.input, styles.multilineInput]}
								onChangeText={(text) => onChangeText(text, 'tasks')}
								placeholder="Enter tasks"
								multiline
							/>
						</View>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => props.setModalVisible(!props.modalVisible)}>
							<Text style={styles.textStyle}>Hide Modal</Text>
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

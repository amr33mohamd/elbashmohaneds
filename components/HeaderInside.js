import React from 'react';
import {
	Platform,
	View,
	TextInput,
	StyleSheet,
	Text,
	AsyncStorage,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Font } from 'expo';
const fontCol = 'white';
const iconCol = 'rgba(255,255,255,0.8)';
const bgCol = Colors.mainColor;


export default class HeaderInside extends React.Component {
	componentDidMount() {

	}

	constructor(props) {
		super(props);


	}




	render() {
		return (
			<View >
  					<Text>subjects</Text>
				</View>
		);
	}
}

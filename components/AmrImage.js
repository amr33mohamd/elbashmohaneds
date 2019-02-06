import React,{Component} from 'react';
import {
	Platform,
	View,
	TextInput,
	StyleSheet,
	Text,
	AsyncStorage,
	TouchableOpacity,
	Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Font } from 'expo';
const fontCol = Colors.secondCol;
const iconCol = 'rgba(255,255,255,0.8)';
const bgCol = Colors.mainColor;

export default class AmrImage extends Component {


	render() {
		return (

				<Image
					style={{ flex: 1, height: 1000, borderRadius: 10 }}
					source={{ uri: this.props.image }}
				/>





		);
	}
}

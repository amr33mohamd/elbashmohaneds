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

export default class NoteBox extends Component {


	render() {
		return (
			<View
				style={{
					backgroundColor: '#FFF',

					paddingHorizontal: 20,
					paddingTop:20

				}}>
				<Image
					style={{ flex: 1, height: 130, borderRadius: 10 }}
					source={{ uri: this.props.image }}
				/>

				<Text
					style={{
            textAlign: 'center',
						padding:10,
						color:'#996c70',
						fontSize:20,
						fontFamily:'myfont'

					}}>
					{this.props.name}
				</Text>



			</View>
		);
	}
}

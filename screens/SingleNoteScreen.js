import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Image,
	Button
} from 'react-native';
import SingleSubjectBox from '../components/SingleSubjectBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import AmrImage from '../components/AmrImage'
import Gallery from 'react-native-image-gallery';
export default class ImagesScreen extends React.Component {


	static navigationOptions = ({ navigation }) => ({
		title:'Browsing Note',
		headerTintColor: Colors.smoothGray,
		fontFamily:'myfont',
	headerStyle: {
		backgroundColor: Colors.mainColor,
		marginTop:-25
	},
	headerTitleStyle: {
		fontWeight: '300',
		color: '#ffffff',
		fontFamily: 'myfont',
		fontSize: 16
	},
	});
	componentDidMount() {


    fetch(Server.dest + '/view-note?id='+this.props.navigation.state.params.id).then((res)=>res.json()).then((supjects)=>{
			console.log(this.props.navigation.state.params.id)
								this.setState({
									doneFetches: 1,
									Subjects: supjects
								});
							});
	}


	_keyExtractor = (item, index) => item.id;



	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			Subjects: [

      ],

		};
	}

	render() {
		const { navigate } = this.props.navigation;

		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color={Colors.mainColor} />;

		return (


			<Gallery
				style={{ flex: 1, backgroundColor: 'black' }}
				images={this.state.Subjects}
			/>

		);
	}
}

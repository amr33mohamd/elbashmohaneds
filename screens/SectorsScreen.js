import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Image,
	Button,
	Platform
} from 'react-native';
import Expo from 'expo';
import SingleSubjectBox from '../components/SingleSubjectBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

var styles = StyleSheet.create({
	box: {
		height: 45,
		backgroundColor: '#FFF',
		shadowColor: '#000000',
		shadowOpacity: 2,
		shadowOffset: {
			height: 2,
			width: 0
		},
		borderColor: 'gray',
		borderWidth: 0.3,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 5,
		backgroundColor: '#fff',
		fontSize: 13,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,
		flex: 1
	},

	topbox: {
		alignItems: 'center',
		height: 55,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},

	restaurant: {
		backgroundColor: 'white',
		flex: 1,
		padding: 100
	}
});

export default class SectorsScreen extends React.Component {


	static navigationOptions = ({ navigation }) => ({
		title:'Sectors',
		headerTintColor: Colors.smoothGray,
		fontFamily:'myfont',
	headerStyle: {
		backgroundColor: Colors.mainColor,
		...Platform.select({
      ios: {
        marginTop:-8
      },
			android:{
				marginTop:-25,
			}
    }),
	},
	headerTitleStyle: {
		fontWeight: '300',
		color: '#ffffff',
		fontFamily: 'myfont',
		fontSize: 16
	},
	});
	componentDidMount() {


    fetch(Server.dest + '/api/sectors?id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((supjects)=>{
								this.setState({
									doneFetches: 1,
									Subjects: supjects
								});
							});
	}





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
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View>

				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5,backgroundColor: Colors.smoothGray  }} />
					)}
					data={this.state.Subjects}

					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => navigate('SubjectsScreen', { key: item.id })}
							activeOpacity={0.7}
						>
							<SingleSubjectBox
								name={item.name}
							/>
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}
}

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


export default class Header extends React.Component {
	componentDidMount() {

	}

	constructor(props) {
		super(props);


	}




	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>

      <View style={styles.box}>

					<TextInput
						{...this.props}
						style={styles.input}
						placeholderTextColor="#999999"
						placeholder="Search for note ...."
						returnKeyType={'search'}
						underlineColorAndroid="transparent"
						onChangeText={text => this.setState({ searchText: text })}
						onSubmitEditing={event => navigate('SearchScreen',{name:this.state.searchText})}
					/>
          <TouchableOpacity onPress={() => navigate('SearchScreen',{name:this.state.searchText})}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
							size={32}
							style={{ padding: 10 }}
							color="gray"
						/>
					</TouchableOpacity>
				</View>
				</View>
		);
	}
}
var styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.mainColor,
	},
	topbox: {
		marginTop: Platform.OS === 'ios' ? 20 : 0,
		paddingTop: 8,
		paddingBottom: 6,
		height: 55,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: bgCol,
		borderBottomColor: '#EEEEEE',
		borderBottomWidth: 1
	},
	box: {
		height: 45,
		backgroundColor: Colors.smoothGray,
		borderRadius: 9,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginVertical: 12,
		marginHorizontal: 10,
		...Platform.select({
      ios: {
        marginTop:30
      },

    }),
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 0,
		backgroundColor: 'transparent',
		fontSize: 15,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,

		flex: 1
	}
});

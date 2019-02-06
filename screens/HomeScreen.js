import React from 'react';
import Expo, { Constants, WebBrowser } from 'expo';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Image,
	Button,
	Linking,
	Platform
} from 'react-native';
import UniveristyBox from '../components/UniveristyBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import { ListView,ImageBackground,Tile,Divider,Title,Subtitle,Caption } from '@shoutem/ui';

var styles = StyleSheet.create({
	box: {
		height: 45,
		backgroundColor: '#FFF',
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

export default class HomeScreen extends React.Component {
	navigate = (url) => { // E
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const name = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    if (routeName === 'SearchScreen') {
      navigate('SearchScreen', { name })
    };
  }
	handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }

	componentDidMount() {
		if (Platform.OS === 'android') {
	     Linking.getInitialURL().then(url => {
	       this.navigate(url);
	     });
	   } else {
	       Linking.addEventListener('url', this.handleOpenURL);
	     }

    fetch(Server.dest + '/api/universities').then((res)=>res.json()).then((universities)=>{
								this.setState({
									doneFetches: 1,
									Uninveristies: universities.data
								});
							});
	}

	componentWillUnmount() { // C
	    Linking.removeEventListener('url', this.handleOpenURL);
	  }

  _keyExtractor = (item, index) => item.id;


	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			Uninveristies: [

      ],

		};

	}
	renderRow = (restaurant)=> {

  return (
		<TouchableOpacity
				activeOpacity={0.9}
					onPress={() => this.props.navigation.navigate('SectorsScreen', { key: restaurant.id })}
				>
		      <ImageBackground
        styleName="large-banner"
        source={{ uri: restaurant.image }}
      >
        <Tile >
          <Caption styleName="sm-gutter-horizontal" style={{fontSize:27,color:'white',fontWeight:'bold'}}>{restaurant.name}</Caption>
        </Tile>
      </ImageBackground>
      <Divider styleName="line" />
    </TouchableOpacity>
  );
}

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color={Colors.mainColor} />;

		return (
			<View>
			<ListView
			        data={this.state.Uninveristies}
			        renderRow={this.renderRow}
			      />
{
				// <FlatList
				// 	automaticallyAdjustContentInsets={false}
				// 	style={{ backgroundColor: 'white' }}
				// 	removeClippedSubviews={false}
				// 	ItemSeparatorComponent={() => (
				// 		<View style={{ height: 5,backgroundColor: Colors.smoothGray  }} />
				// 	)}
        //   keyExtractor={this._keyExtractor}
				// 	data={this.state.Uninveristies}
				// 	renderItem={({ item }) => (
				// 		<TouchableOpacity
				// 		activeOpacity={0.7}
				// 			onPress={() => navigate('SectorsScreen', { key: item.id })}
				// 		>
				// 			<UniveristyBox
				// 				name={item.name}
				// 				image={item.image}
				// 			/>
				// 		</TouchableOpacity>
				// 	)}
				// />
			}
			</View>
		);
	}
}

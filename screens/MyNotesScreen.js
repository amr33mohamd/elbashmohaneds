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
	Modal,
	Share,
	Linking
} from 'react-native';
import Expo, { Constants, WebBrowser } from 'expo';
import SingleNoteBox from '../components/SingleNoteBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SingleSubjectBox from '../components/SingleSubjectBox';
import { ListView,ImageBackground,Tile,Divider,Title,Subtitle,Caption } from '@shoutem/ui';
import {View as View2} from 'react-native'

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

export default class MyNotesScreen extends React.Component {
	_handlePressButtonAsync = async (id) => {
	    let result = await WebBrowser.openBrowserAsync(Server.dest + '/view-note?id='+id);
	    this.setState({ result });
	  };

 browse = ()=>{
	 this.props.navigation.navigate('ImagesScreen',{key:this.state.CurentOpenedId});
	 this.closeModal();
 }
 make_order = ()=>{
	 this.props.navigation.navigate('BuyScreen',{key:this.state.CurentOpenedId});
	 this.closeModal();
 }
 static navigationOptions = ({ navigation }) => ({
	 title:'MyNotes',
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
		AsyncStorage.getItem('id').then((id)=>{
			fetch(Server.dest + '/api/mynotes?id='+id).then((res)=>res.json()).then((supjects)=>{
									this.setState({
										doneFetches: 1,
										Subjects: supjects
									});
								});
		})

	}


  _keyExtractor = (item, index) => item.id;

render_options = () =>{

}
onClick() {
  Share.share({
    message: 'Fastrack : You can buy the note from here : '+'http://fastrack.xyz:5050'+'/buy-first?id='+this.props.navigation.state.params.key+' and for more notes download Fastrack : https://play.google.com/store/apps/details?id=com.Fastrack.GarashSoftwareHouse',
    url: 'https://play.google.com/store/apps/details?id=com.Fastrack.GarashSoftwareHouse',
    title: 'https://play.google.com/store/apps/details?id=com.Fastrack.GarashSoftwareHouse'
  }, {
    // Android only:
    dialogTitle: 'Share Fastrack',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  })
}

	openModal = (id) =>{
    this.setState({modalVisible:true,currentOpenedNote:id});
  }
	closeModal() {
    this.setState({modalVisible:false});
  }
	viewNote = (id)=>{
		this.closeModal()
		 this.props.navigation.navigate('SingleNoteScreen',{id:id.id,currentOpenedNote:id})
	}
	downNote = ()=>{
		var pdf = this.state.currentOpenedNote.image.replace("-0.png",".pdf")
		Linking.openURL(pdf);
	}
	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			modalVisible: false,
			currentOpenedNote:0,
			result: null,
			Subjects: [

      ],

		};
	}
	renderRow = (restaurant)=> {

  return (
		<TouchableOpacity
			onPress={() => this.viewNote(restaurant)}
			activeOpacity={0.7}
		>
		      <ImageBackground
        styleName="large-banner"
        source={{ uri: restaurant.image }}
      >
        <Tile style={{padding:10}} >
          <Caption styleName="sm-gutter-horizontal" style={{fontSize:30,color:'white',fontWeight:'bold',padding:10}}>{restaurant.name}</Caption>
					<Subtitle styleName="sm-gutter-horizontal" style={{fontWeight:'bold',fontSize:25}}>{restaurant.description}</Subtitle>

        </Tile>
      </ImageBackground>
      <Divider styleName="line" />
    </TouchableOpacity>
  );
}

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <Text style={{textAlign:'center',justifyContent:'center',alignSelf:'center',marginTop:'50%'}}>You have not notes yet</Text>;

			if(this.state.Subjects.length != 0){
		return (


			<View>
			<Modal
							visible={this.state.modalVisible}
							animationType={'slide'}
							onRequestClose={() => this.closeModal()}
					>
						<View2 style={styles.modalContainer}>
							<View2 style={styles.innerContainer}>
								<Text style={{fontFamily:'myfont',fontSize:25}}>Confirm buying the note</Text>
								<View2 style={styles.buttons}>

								<TouchableOpacity
										onPress={() => this.viewNote()}
								>
								<Text   style={styles.button}>View Note</Text>
								</TouchableOpacity>
								<TouchableOpacity
										onPress={() => this.downNote()}
								>
								<Text   style={styles.button}>Download note</Text>
								</TouchableOpacity>
								<TouchableOpacity
										onPress={() => this.closeModal()}
								>
								<Text   style={styles.button}>Close</Text>
								</TouchableOpacity>

								</View2>
							</View2>
						</View2>
					</Modal>

			<ListView
			        data={this.state.Subjects}
			        renderRow={this.renderRow}
			      />

{
	/*
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5,backgroundColor: Colors.smoothGray  }} />
					)}
					data={this.state.Subjects}
          keyExtractor={this._keyExtractor}

					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('SingleNoteScreen',{id:item.id})}
							activeOpacity={0.7}
						>
							<SingleNoteBox
								name={item.name}
                price={item.price}
                image={item.image}
                desc={item.description}
							/>
						</TouchableOpacity>
					)}
				/>
				*/
			}
				<Text>{this.state.result && JSON.stringify(this.state.result)}</Text>

			</View>
		);
	}

else{
	return(
		<Text style={{textAlign:'center',justifyContent:'center',alignItems:'center',fontSize:14,fontFamily:'myfont',marginTop:240}}>You still did not bought any notes yet</Text>
	)
}
}
}
const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:Colors.mainColor,
    fontFamily:'myfont',
    padding:10,
    fontSize:15,
		width:200,
		textAlign:'center',
		fontFamily:'myfont',
		fontSize:15,
		fontWeight:'bold',
    color:'white',
    marginTop:5
  },
  buttons:{

    alignItems: 'center',
    justifyContent: 'center',

  }
})

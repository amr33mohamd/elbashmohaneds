import React from 'react';
import {
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Modal,
	Share,
	Platform
} from 'react-native';
import SingleNoteBox from '../components/SingleNoteBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SingleSubjectBox from '../components/SingleSubjectBox';
import { ListView,ImageBackground,Tile,Divider,Title,Subtitle,Caption,Icon,Button,Image,Row,View } from '@shoutem/ui';
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
	},
	text2:{
 		marginLeft:10,
 	},
 	box2:{
 		flexDirection:'row',
 		height:100,
 		alignItems:'center'
 	},
 	icon2:{
 		justifyContent: 'flex-end',
 		marginLeft:10,


 	}
});

export default class NotesScreen extends React.Component {

 browse = ()=>{
	 this.props.navigation.navigate('ImagesScreen',{key:this.state.CurentOpenedId});
	 this.closeModal();
 }
 make_order = (type)=>{
	 this.props.navigation.navigate('BuyScreen',{key:this.state.CurentOpenedId,type});
	 this.closeModal();
 }
 static navigationOptions = ({ navigation }) => ({
	 title:'Notes',
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
    fetch(Server.dest + '/api/notes?id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((supjects)=>{
								this.setState({
									doneFetches: 1,
									Subjects: supjects
								});
							});
AsyncStorage.getItem('id').then((id)=>{
	this.setState({user:id})
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

	openModal(item) {
    this.setState({modalVisible:true,CurentOpenedId:item.id,CurentOpenedItem:item});
  }
	closeModal() {
    this.setState({modalVisible:false,CurentOpenedId:0});
  }
	constructor(props) {
		super(props);
		this.state = {
			user:0,
			doneFetches: 0,
			modalVisible: false,
			CurentOpenedId:0,
			CurentOpenedItem:[],
			Subjects: [

      ],

		};


	}

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

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
										onPress={() => this.browse()}
								>
								<Text   style={styles.button}>Free Browsing</Text>
								</TouchableOpacity>

								{

								(this.state.user != '01116775827')?
								<TouchableOpacity
                    onPress={() => this.make_order('1')}
                >
                <Text   style={styles.button}>Buy Now </Text>
                </TouchableOpacity>

								:null
								}
								{
									(this.state.user != '01116775827')?

									//if there is item oppened
									(this.state.CurentOpenedId != 0)?
									//there is video ->
									(this.state.CurentOpenedItem.video != 0)?
									<View>
									<TouchableOpacity
											onPress={() => this.make_order('2')}
									>
									<Text   style={styles.button}>buy video - {this.state.CurentOpenedItem.video_price} kwd</Text>
									</TouchableOpacity>
									<TouchableOpacity
											onPress={() => this.make_order('3')}
									>
									<Text   style={styles.button}>buy video+note - {this.state.CurentOpenedItem.both} kwd</Text>
									</TouchableOpacity>
									</View>
									:
									//no video
									null
									:
									//no current item
									null
									:null
								}
								<TouchableOpacity
                    onPress={() => this.onClick()}
                >
                <Text   style={styles.button}>Share</Text>
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

				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5,backgroundColor: Colors.smoothGray  }} />
					)}
					data={this.state.Subjects}
          keyExtractor={this._keyExtractor}
					ListHeaderComponent = {()=>(

						<TouchableOpacity
							onPress={() => navigate('FreeNotesScreen', { key: this.props.navigation.state.params.key })}
							activeOpacity={0.7}
							style={{
									borderBottomWidth:5,
									borderBottomColor:Colors.smoothGray
							}}
						>

							<SingleSubjectBox
								name="Free Notes"
							/>

						</TouchableOpacity>
					)}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => this.openModal(item)}
							activeOpacity={0.7}
						>
						{
							// <SingleNoteBox
							// 	name={item.name}
              //   price={item.price}
              //   image={item.image}
              //   desc={item.description}
							// />
						}
						<Row>

						<Image
		styleName="small rounded-corners"
		source={{ uri: item.image }}
	/>
	<View styleName="vertical stretch space-between">
		<Subtitle style={{fontSize:17}}>{item.name} | {item.description}</Subtitle>

		<View styleName="horizontal">
			<Subtitle styleName="md-gutter-right">{item.price} kwd</Subtitle>
		</View>
	</View>
	<Button styleName="right-icon"><Icon name="add-to-cart" /></Button>
	</Row>

						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}

else{
	return(
		<View2 style={{backgroundColor:'#fff'}}>
		<TouchableOpacity
			onPress={() => navigate('FreeNotesScreen', { key: this.props.navigation.state.params.key })}
			activeOpacity={0.7}
			style={{
					borderBottomWidth:5,
					borderBottomColor:Colors.smoothGray,
					flexDirection:'row',
					height:60,
			 		alignItems:'center',
			}}
		>


				<Text style={{fontSize:18,color:Colors.mainColor,
				fontFamily:'myfont',
				fontWeight:'bold',
			textAlign:'left',
		flex:1,padding:10}}>Free Notes</Text>
			<Ionicons
					name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-dropright'}
					size={35}
					style={{justifyContent:'flex-end',alignSelf:'flex-end',padding:10}}
					color={Colors.mainColor}
					/>


		</TouchableOpacity>
		</View2>
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

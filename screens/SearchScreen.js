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
	Modal
} from 'react-native';
import SingleNoteBox from '../components/SingleNoteBox';
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

export default class SearchScreen extends React.Component {

 browse = ()=>{
	 this.props.navigation.navigate('ImagesScreen',{key:this.state.CurentOpenedId});
	 this.closeModal();
 }
 make_order = ()=>{
	 this.props.navigation.navigate('BuyScreen',{key:this.state.CurentOpenedId});
	 this.closeModal();
 }
 static navigationOptions = ({ navigation }) => ({
 	title:'Search Result',
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

    fetch(Server.dest + '/api/searchnotes?id='+this.props.navigation.state.params.name).then((res)=>res.json()).then((supjects)=>{
								this.setState({
									doneFetches: 1,
									Subjects: supjects
								});
							});
	}


  _keyExtractor = (item, index) => item.id;

render_options = () =>{

}


	openModal(id) {
    this.setState({modalVisible:true,CurentOpenedId:id});
  }
	closeModal() {
    this.setState({modalVisible:false});
  }
	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			modalVisible: false,
			CurentOpenedId:0,
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
			<Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text style={{fontFamily:'myfont',fontSize:25}}>Confirm buying the note</Text>
                <View style={styles.buttons}>

                <TouchableOpacity
                    onPress={() => this.make_order()}
                >
                <Text   style={styles.button}>Buy Now</Text>
                </TouchableOpacity>
								<TouchableOpacity
                    onPress={() => this.browse()}
                >
                <Text   style={styles.button}>Free Browsing</Text>
                </TouchableOpacity>
								<TouchableOpacity
                    onPress={() => this.make_order()}
                >
                <Text   style={styles.button}>Share</Text>
                </TouchableOpacity>
								<TouchableOpacity
                    onPress={() => this.closeModal()}
                >
                <Text   style={styles.button}>Close</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
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

					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => this.openModal(item.id)}
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
			</View>
		);
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

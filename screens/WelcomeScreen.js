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
	Linking,
	TextInput,
	KeyboardAvoidingView,
	SafeAreaView
} from 'react-native';
import SingleNoteBox from '../components/SingleNoteBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';


export default class WelcomeScreen extends React.Component {


 static navigationOptions = ({ navigation }) => ({
	 title:'Welcome',
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

    // fetch(Server.dest + '/api/freenotes?id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((supjects)=>{
		// 						this.setState({
		// 							doneFetches: 1,
		// 							Subjects: supjects
		// 						});
		// 					});
	}


  _keyExtractor = (item, index) => item.id;

render_options = () =>{

}
submit_number() {
	if(this.state.phone != ""){
	fetch(Server.dest + '/api/verifynumber?phone='+this.state.phone).then((res)=>res.json()).then((data)=>{
		if(data.response == 1){
			AsyncStorage.setItem('id',''+this.state.phone).then(()=>{
				this.props.navigation.navigate('Main');
			})
		}
		else{
			this.setState({
				err: 'Your already using this phone number on other device please if not contact Mohamed Younis'
			});
		}
	});
	}
	else{
		this.setState({
			err: 'Please Enter your phone number'
		});
	}
}


	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			err:'',
			phone:''
		};

		AsyncStorage.getItem('id').then((id)=>{
			if(id){
				this.props.navigation.navigate('Main');
			}
			else{

			}
		})
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<SafeAreaView>
			<View >
			<Image
				style={{ width: '100%', height: '50%' }}
				resizeMode="cover"
				source={require('../assets/images/icon.png')}
			/>
			<Text style={{color:'red',fontFamily:'myfont'}}>{this.state.err}</Text>
			<KeyboardAvoidingView>
			<View style={styles.box}>
			<TextInput
			placeholderTextColor="#999999"

			underlineColorAndroid="transparent"
			style={styles.input}
				placeholder="Phone Number"
				minLength={2}
				autoFocus={false}
				listViewDisplayed="auto"
				fetchDetails={false}
				value={this.state.phone}
				onChangeText={(text)=>{
					this.setState({
						phone:text
					})
				}}
				onSubmitEditing ={() => {
				this.submit_number();
				}}
			/>
			</View>
			<TouchableOpacity style={{alignItems:'center',justifyContent:'flex-end'}} onPress={() => this.submit_number()}>
				<View style={{backgroundColor:Colors.mainColor,padding:10,borderRadius:10, width:120,justifyContent:'center'}}>
					<Text style={{fontFamily:'myfont',color:Colors.secondaryColor,textAlign:'center'}}>Start</Text>
				</View>
			</TouchableOpacity>
			</KeyboardAvoidingView>
			</View>
			</SafeAreaView>
		);



}
}
const styles = StyleSheet.create({

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 5,
		backgroundColor: 'white',
		fontSize: 15,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,

		flex: 1
	},
	box: {
		height: 45,
		backgroundColor: 'white',
		borderRadius: 9,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginVertical: 12,
		marginHorizontal: 10
	},
})

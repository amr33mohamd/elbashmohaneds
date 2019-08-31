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
	SafeAreaView,
	Platform,
	ScrollView
} from 'react-native';
import SingleNoteBox from '../components/SingleNoteBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';


export default class AddressScreen extends React.Component {


 static navigationOptions = ({ navigation }) => ({
	 title:'Welome to Elbashmohandes',
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
submit() {
	if(this.state.mohafza != ""){
		var mohafza = this.state.mohafza;
		var mntqa = this.state.mntqa;
		var qt3a = this.state.qt3a;
		var street = this.state.street;
		var home = this.state.home;
		var gada = this.state.gada;
		var floor = this.state.floor;

		var type = this.props.navigation.state.params.type;
		this.props.navigation.navigate('BuyScreen',{key:this.props.navigation.state.params.key,type,mohafza,mntqa,qt3a,street,home,gada,floor});
	}
	else{
		this.setState({
			err: 'الرجاء كتابه المحافظه'
		});
	}
}


	constructor(props) {
		super(props);
		this.state = {
			mntqa:'',
			qt3a:'',
			street:'',
			home:'',
			doneFetches: 0,
			err:'',
			phone:'',
			mohafza:'',
			gada:'',
			floor:''

		};


	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<ScrollView>
			<View style={{backgroundColor:'#fff'}}>

			<Text style={{color:'red',fontFamily:'myfont'}}>{this.state.err}</Text>
			<KeyboardAvoidingView behavior="padding" enabled>
                <Text style={{fontFamily:'myfont',fontSize:15,color:Colors.mainColor,flex:.1,textAlign:'center'}}>
                    إذا تم طلب المذكرة قبل الساعه ١٢ الظهر يتم توصيلها في نفس اليوم من ٦ ل ٩ مساء
                    إذا تم طلب المذكرة بعد الساعه ١٢ الظهر يتم توصيلها في اليوم التالي من ٦ ل ٩ مساء
                    ( المذكرات أبيض وأسود فقط تغليف حلزوني )
				</Text>

			<View style={styles.box}>
			<TextInput
			placeholderTextColor="#999999"

			underlineColorAndroid="transparent"
			style={styles.input}
				placeholder="المحافظه"
				minLength={2}
				autoFocus={false}
				listViewDisplayed="auto"
				fetchDetails={false}
				value={this.state.mohafza}
				onChangeText={(text)=>{
					this.setState({
						mohafza:text
					})
				}}

			/>
			</View>
			<View style={styles.box}>
			<TextInput
			placeholderTextColor="#999999"

			underlineColorAndroid="transparent"
			style={styles.input}
				placeholder="المنطقه"
				minLength={2}
				autoFocus={false}
				listViewDisplayed="auto"
				fetchDetails={false}
				value={this.state.mntqa}
				onChangeText={(text)=>{
					this.setState({
						mntqa:text
					})
				}}

			/>
			</View>
			<View style={styles.box}>
			<TextInput
			placeholderTextColor="#999999"

			underlineColorAndroid="transparent"
			style={styles.input}
				placeholder="القطعه"
				minLength={2}
				autoFocus={false}
				listViewDisplayed="auto"
				fetchDetails={false}
				value={this.state.qt3a}
				onChangeText={(text)=>{
					this.setState({
						qt3a:text
					})
				}}

			/>
			</View>
			<View style={styles.box}>
			<TextInput
			placeholderTextColor="#999999"

			underlineColorAndroid="transparent"
			style={styles.input}
				placeholder="الشارع"
				minLength={2}
				autoFocus={false}
				listViewDisplayed="auto"
				fetchDetails={false}
				value={this.state.street}
				onChangeText={(text)=>{
					this.setState({
						street:text
					})
				}}

			/>
			</View>
			<View style={styles.box}>
			<TextInput
			placeholderTextColor="#999999"

			underlineColorAndroid="transparent"
			style={styles.input}
				placeholder=" المنزل / العماره"
				minLength={2}
				autoFocus={false}
				listViewDisplayed="auto"
				fetchDetails={false}
				value={this.state.home}
				onChangeText={(text)=>{
					this.setState({
						home:text
					})
				}}

			/>
			</View>
			<View style={styles.box}>

			<TextInput
			placeholderTextColor="#999999"

			underlineColorAndroid="transparent"
			style={styles.input}
				placeholder="الجاده"
				minLength={2}
				autoFocus={false}
				listViewDisplayed="auto"
				fetchDetails={false}
				value={this.state.gada}
				onChangeText={(text)=>{
					this.setState({
						gada:text
					})
				}}

			/>
			</View>
			<View style={styles.box}>

			<TextInput
			placeholderTextColor="#999999"

			underlineColorAndroid="transparent"
			style={styles.input}
				placeholder=" الدور / الشقه"
				minLength={2}
				autoFocus={false}
				listViewDisplayed="auto"
				fetchDetails={false}
				value={this.state.fllor}
				onChangeText={(text)=>{
					this.setState({
						floor:text
					})
				}}

			/>
			</View>

			<TouchableOpacity style={{alignItems:'center',justifyContent:'flex-end',marginBottom:100
			}} onPress={() => this.submit()}>
				<View style={{backgroundColor:Colors.mainColor,padding:10,borderRadius:10, width:120,justifyContent:'center'}}>
					<Text style={{fontFamily:'myfont',color:Colors.secondaryColor,textAlign:'center'}}>Start</Text>
				</View>
			</TouchableOpacity>
			</KeyboardAvoidingView>
			</View>
			</ScrollView>
		);



}
}
const styles = StyleSheet.create({

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		textAlign:'center',
		backgroundColor: 'transparent',
		fontSize: 15,
		alignItems: 'center',
		flex: 1
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
		borderColor:Colors.mainColor,
		borderWidth:1,

	},
})

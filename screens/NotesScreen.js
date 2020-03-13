import React from 'react';
import {
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Modal,
	Share,
	Platform,
	ScrollView,
} from 'react-native';
import SingleNoteBox from '../components/SingleNoteBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SingleSubjectBox from '../components/SingleSubjectBox';
import { ListView,TextInput,ImageBackground,Tile,Divider,Title,Subtitle,Caption,Icon,Button,Image,Row,View } from '@shoutem/ui';
import {View as View2} from 'react-native'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

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
	 if(type == 6 || type == 5){
		 this.props.navigation.navigate('AddressScreen',{key:this.state.CurentOpenedId,type});
		 this.closeModal();

	 }else {
		 this.props.navigation.navigate('BuyScreen',{key:this.state.CurentOpenedId,type});
		 this.closeModal();
	 }
 }
 static navigationOptions = ({ navigation }) => ({
	 title:'المذكرات',
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
	 color: 'black',
	 fontFamily: 'myfont',
	 fontSize: 18
 },

 });
 browsev = ()=>{
	 this.props.navigation.navigate('ImagesScreen',{key:this.state.CurentOpenedIdv});
	 this.closeModal();
 }

 make_orderv = (type)=>{
	 if(type == 6 || type == 5){
		 this.props.navigation.navigate('AddressScreen',{key:this.state.CurentOpenedIdv,type});
		 this.closeModal();

	 }else {
		 this.props.navigation.navigate('BuyScreen',{key:this.state.CurentOpenedIdv,type});
		 this.closeModal();
	 }
 }
 make_order2v = ()=>{
	AsyncStorage.getItem('id').then((id)=>{
		fetch(Server.dest + '/free-view-video?id='+this.state.CurentOpenedIdv+'&deviceid='+id).then((res)=>res.json()).then((supjects)=>{
			this.props.navigation.navigate('Notes')
						 });
	})

	this.closeModal();
 }
 onClickv() {
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
 openModalv(item) {
 	this.setState({modalVisiblev:true,CurentOpenedIdv:item.id,CurentOpenedItemv:item});
 }

 openModalf(item) {
  this.setState({modalVisiblef:true,CurentOpenedIdf:item.id,CurentOpenedItemf:item});
 }
 	closeModalv() {
     this.setState({modalVisiblev:false});
   }
	 closeModalf() {
      this.setState({modalVisiblef:false});
    }


	 browsef = ()=>{
		 this.props.navigation.navigate('ImagesScreen',{key:this.state.CurentOpenedIdf});
		 this.closeModal();
	 }

	 make_orderf = ()=>{
		 AsyncStorage.getItem('id').then((id)=>{
			 fetch(Server.dest + '/free-view-note?id='+this.state.CurentOpenedIdf+'&deviceid='+id).then((res)=>res.json()).then((supjects)=>{
				 this.props.navigation.navigate('Notes')
								});
		 })

		 this.closeModal();
	 }
	 make_order2f = ()=>{
		AsyncStorage.getItem('id').then((id)=>{
			fetch(Server.dest + '/free-view-video?id='+this.state.CurentOpenedIdf+'&deviceid='+id).then((res)=>res.json()).then((supjects)=>{
				this.props.navigation.navigate('Notes')
							 });
		})

		this.closeModal();
	 }

	componentDidMount() {
		fetch(Server.dest + '/api/freenotes?id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((supjects)=>{
								this.setState({
									doneFetches: 1,
									Subjectsf: supjects
								});
							});
		fetch(Server.dest + '/api/videos?sub_category='+this.props.navigation.state.params.key).then((res)=>res.json()).then((supjects)=>{
								this.setState({
									doneFetchesv: 1,
									Subjectsv: supjects.videos
								});
							});
    fetch(Server.dest + '/api/notes?id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((supjects)=>{
								this.setState({
									doneFetches: 1,
									Subjects: supjects
								});
							});
							fetch(Server.dest + '/api/midterms?id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((midterms)=>{
													this.setState({
														doneFetches: 1,
														midterms
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
			coupon:'',
			midterms:[],
			Subjects: [

      ],
			doneFetchesv: 0,
			modalVisiblev: false,
			CurentOpenedIdv:0,
			CurentOpenedItemv:[],
			Subjectsv: [

			],
			doneFetchesf: 0,
			modalVisiblef: false,
			CurentOpenedIdf:0,
			CurentOpenedItemf:[],
			Subjectsf: [

      ],


		};


	}
coupon =() =>{
	coupon = this.state.coupon;
	if(coupon == ''){
		alert('please add coupon')
	}
	else {
		AsyncStorage.getItem('id').then((id)=>{
		fetch(Server.dest + '/api/couponvideo?deviceId='+id+'&coupon='+coupon+'&note_id='+this.state.CurentOpenedItem.id).then((res)=>res.json()).then((data)=>{
			if(data.response == 1){
				this.props.navigation.navigate('Videos')
				this.closeModal()
			}
			else {
				alert("coupon isn't valid")
			}
		});
		});
	}
}
	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

			if(this.state.Subjects.length != 0){
		return (


			<View>
			<Modal
              visible={this.state.modalVisiblef}
              animationType={'slide'}
              onRequestClose={() => this.closeModalf()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text style={{fontFamily:'myfont',fontSize:25}}>Confirm buying the note</Text>
                <View style={styles.buttons}>

                <TouchableOpacity
                    onPress={() => this.make_orderf()}
                >
                <Text   style={styles.button}>Get Note Now</Text>
                </TouchableOpacity>

								{


								(this.state.CurentOpenedItem.video != 0)?
								<TouchableOpacity
										onPress={() => this.make_order2f()}
								>
								<Text   style={styles.button}>Get Video Now</Text>
								</TouchableOpacity>

								:null
								}
								<TouchableOpacity
                    onPress={() => this.onClickf()}
                >
                <Text   style={styles.button}>Share</Text>
                </TouchableOpacity>
								<TouchableOpacity
                    onPress={() => this.closeModalf()}
                >
                <Text   style={styles.button}>Close</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
			<Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View2 style={styles.modalContainer}>

              <View2 style={styles.innerContainer}>
							<ScrollView>
							{
        //         <Text style={{fontFamily:'myfont',fontSize:15,color:'white',flex:.1,textAlign:'center'}}>
				// 				إذا تم طلب المذكرة قبل الساعه ١٢ الظهر يتم توصيلها في نفس اليوم من ٦ ل ٩ مساء
				// 				إذا تم طلب المذكرة بعد الساعه ١٢ الظهر يتم توصيلها في اليوم التالي من ٦ ل ٩ مساء
				// 				( المذكرات أبيض وأسود فقط تغليف حلزوني )
				// </Text>
			}
                <View2 style={styles.buttons}>
								<TouchableOpacity
										onPress={() => this.browse()}
								>
								<Text   style={styles.button}>تصفح ٤ صفحات مجانا</Text>
								</TouchableOpacity>

								{

								(this.state.user != '01116775827')?
								<View>
								<TouchableOpacity
                    onPress={() => this.make_order('1')}
                >
                <Text   style={styles.button}>تصفح المذكرة كاملة بدون طباعة {"\n"}
								 {this.state.CurentOpenedItem.price} KD </Text>
                </TouchableOpacity>
								{
								// <TouchableOpacity
								// 		onPress={() => this.make_order('6')}
								// >
								// <Text  style={styles.button}>توصيل المذكره فقط للمنزل - {this.state.CurentOpenedItem.deliver} kwd</Text>
								// </TouchableOpacity>
							}
								</View>
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
									<Text   style={styles.button}>مشاهده الفيديو فقط  {"\n"} {this.state.CurentOpenedItem.video_price} KD</Text>
									</TouchableOpacity>

									{
									// <TouchableOpacity
									// 		onPress={() => this.make_order('5')}
									// >
									// <Text   style={styles.button}>مشاهده فيديو مع توصيل المذكره للمنزل - {this.state.CurentOpenedItem.with_deliver} kwd</Text>
									// </TouchableOpacity>
								}

									<TouchableOpacity
											onPress={() => this.make_order('3')}
									>
									<Text   style={styles.button}>شراء الفيديو مع المذكره بدون طباعه {"\n"} {this.state.CurentOpenedItem.both} KD</Text>
									</TouchableOpacity>

									<Text style={{fontFamily:'myfont',fontSize:25}}>Have a coupon</Text>

									<TextInput

										placeholder={'Type here'}
										onChangeText={(text)=>{
											this.setState({coupon:text})
										}}
										value={this.state.coupon}
										/>
										<TouchableOpacity
		                    onPress={() => this.coupon()}
		                >
		                <Text   style={styles.button}>Enter coupon</Text>
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

								<Text style={{width:250,textAlign:'center',padding:10}}>يرجي مراجعة المبلغ في الصفحة القادمة قبل تأكيد الدفع لأنه يوجد عمولة لشركة الدفع اونلاين ، وشكرا</Text>
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
								</ScrollView>

              </View2>

            </View2>

          </Modal>



					<Modal
									visible={this.state.modalVisiblev}
									animationType={'slide'}
									onRequestClose={() => this.closeModalv()}
							>
								<View style={styles.modalContainer}>
									<View style={styles.innerContainer}>
										<Text style={{fontFamily:'myfont',fontSize:25}}>Confirm buying the note</Text>
										<View style={styles.buttons}>

										<TouchableOpacity
												onPress={() => this.make_orderv('7')}
										>
										<Text   style={styles.button}>Get Video Now</Text>
										</TouchableOpacity>


										<TouchableOpacity
												onPress={() => this.onClickv()}
										>
										<Text   style={styles.button}>Share</Text>
										</TouchableOpacity>
										<TouchableOpacity
												onPress={() => this.closeModalv()}
										>
										<Text   style={styles.button}>Close</Text>
										</TouchableOpacity>
										</View>
									</View>
								</View>
							</Modal>

							<ScrollView>
							<SingleSubjectBox
								name={this.props.navigation.state.params.name}
							/>
					<Collapse style={{marginLeft:20}}>
						<CollapseHeader>
						<View>
									<SingleSubjectBox
										name="Free Notes"
									/>
									</View>
					    </CollapseHeader>
					    <CollapseBody>
							<FlatList
								automaticallyAdjustContentInsets={false}
								style={{ backgroundColor: 'white' }}
								removeClippedSubviews={false}
								ItemSeparatorComponent={() => (
									<View style={{ height: 5,backgroundColor: 'white'  }} />
								)}
								data={this.state.Subjectsf}
								keyExtractor={this._keyExtractor}
ListEmptyComponent={()=>(
	<View style={{height:40}}>
	<Text style={{fontSize:20,textAlign:'center'}}>No free Notes</Text>
	</View>
)}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => this.openModalf(item)}
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
							</CollapseBody>
					</Collapse>

									<Collapse style={{marginLeft:20}}>
    <CollapseHeader>
      <View>

									<SingleSubjectBox
										name="Videos"
									/>
									</View>
									    </CollapseHeader>
									    <CollapseBody>
											<FlatList
												automaticallyAdjustContentInsets={false}
												style={{ backgroundColor: 'white' }}
												removeClippedSubviews={false}
												ItemSeparatorComponent={() => (
													<View style={{ height: 5,backgroundColor: 'white'  }} />
												)}
												data={this.state.Subjectsv}
												keyExtractor={this._keyExtractor}
												ListEmptyComponent={()=>(
													<View style={{height:40}}>
													<Text style={{fontSize:20,textAlign:'center'}}>No  Videos</Text>
													</View>
												)}
												renderItem={({ item }) => (
													<TouchableOpacity
														onPress={() => this.openModalv(item)}
														activeOpacity={0.7}
													>
														<SingleNoteBox
															name={item.name}
															price={item.price}
															image='https://www.promoteproductions.com/wp-content/uploads/2018/03/video-1364122_960_720-1.png'
															desc={item.name}
														/>
													</TouchableOpacity>
												)}
											/>
									    </CollapseBody>
									</Collapse>


									<Collapse style={{marginLeft:20}}>
    <CollapseHeader>
      <View>
			<SingleSubjectBox
				name="Notes"
			/>
			  </View>
    </CollapseHeader>
    <CollapseBody>
		<FlatList
			automaticallyAdjustContentInsets={false}
			style={{ backgroundColor: 'white' }}
			removeClippedSubviews={false}
			ItemSeparatorComponent={() => (
				<View style={{ height: 5,backgroundColor: 'white' }} />
			)}
			data={this.state.Subjects}
			keyExtractor={this._keyExtractor}
			ListHeaderComponent = {()=>(

				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5,backgroundColor: 'white'  }} />
					)}
					data={this.state.midterms}
					keyExtractor={this._keyExtractor}

					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={()=>{
								this.props.navigation.navigate('AddressScreen',{key:item.id,type:4})

							}}
							activeOpacity={0.7}
						>

						<Row>

						<Image
		styleName="small rounded-corners"
		source={{ uri: 'https://elgarblog.files.wordpress.com/2014/01/education-books.jpg' }}
	/>
	<View styleName="vertical stretch space-between">
		<Subtitle style={{fontSize:17}}> {item.name}  </Subtitle>
<Subtitle style={{fontSize:17}}>{item.descc}</Subtitle>
		<View styleName="horizontal">
			<Subtitle styleName="md-gutter-right">{item.price} kwd</Subtitle>
		</View>
	</View>
	<Button styleName="right-icon"><Icon name="add-to-cart" /></Button>
	</Row>

						</TouchableOpacity>
					)}
				/>
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
<Subtitle style={{fontSize:17}}>{item.name} </Subtitle>
<Subtitle style={{fontSize:17}}> {item.description}</Subtitle>
<View styleName="horizontal">
</View>
</View>
<Button styleName="right-icon"><Icon name="add-to-cart" /></Button>
</Row>

				</TouchableOpacity>
			)}
		/>

    </CollapseBody>
</Collapse>

</ScrollView>


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

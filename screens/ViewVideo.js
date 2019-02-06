import React from 'react';
import Expo, { Constants, WebBrowser,Video,ScreenOrientation } from 'expo';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Image,
	Button,
	WebView,
	Linking,
Share,
Platform
} from 'react-native';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import VideoPlayer from '@expo/videoplayer';



export default class ViewVideo extends React.Component {


	static navigationOptions = ({ navigation }) => ({
		title:'Watch Video',
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

get_uri = ()=>{
	AsyncStorage.getItem('id').then((id)=>{

		var	uri  = Server.dest+'/buy-first?id='+this.props.navigation.state.params.key+'&deviceId='+id;
		return uri;
	})
}
onClick() {
	AsyncStorage.getItem('id').then((id)=>{
		Share.share({
	    message: Server.dest+'/api/sharevideo?id='+this.props.navigation.state.params.id+'&deviceId='+id,
	    url: Server.dest+'/api/sharevideo?id='+this.props.navigation.state.params.id+'&deviceId='+id,
	    title: Server.dest+'/api/sharevideo?id='+this.props.navigation.state.params.id+'&deviceId='+id,
	  }, {
	    // Android only:
	    dialogTitle: 'Share Fastrack',
	    // iOS only:
	    excludedActivityTypes: [
	      'com.apple.UIKit.activity.PostToTwitter'
	    ]
	  })
	})

}

//Server.dest+'/buy-first?id='+this.props.navigation.state.params.id
	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,


		};
		ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);

	}
	componentWillUnmount(){
		ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);

	}

	render() {

		AsyncStorage.getItem('id').then((id)=>{

			const	uri  = Server.dest+'/buy-first?id='+this.props.navigation.state.params.key+'&deviceId='+id+'&type='+this.props.navigation.state.params.type;
			this.setState({
				uri,
				doneFetches:1
			})
		})
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color={Colors.mainColor} />;

		// const uri = "http://example.com"
		return (

      <View style={{ flex: 1 }}>
			{
				/*
         <WebView
           bounces={false}
           scrollEnabled={true}
					 ref={(ref) => { this.webview = ref; }}
           source={{   uri:this.props.navigation.state.params.link}}
					 onNavigationStateChange={(event) => {
          if (event.url == 'http://example.com/') {
            this.webview.stopLoading();
            this.props.navigation.navigate('Notes')
          }}
				}
					 />

					 */
				 }
				 <Video
 source={{ uri: this.props.navigation.state.params.link}}
 rate={1.0}
 volume={1.0}
 isMuted={false}
 useNativeControls={true}
 resizeMode="contain"
 naturalSize={{orientation:'landscape',width:1,height:1}}
 shouldPlay
 isLooping
 isPortrait={true}

 style={{ width: '100%', height: 300 }}
/>
				 {
					 /*
				 <VideoPlayer
	   videoProps={{
	     shouldPlay: true,
	     resizeMode: Video.RESIZE_MODE_CONTAIN,
	     source: {
	       uri: this.props.navigation.state.params.link,
	     },
	   }}
	   isPortrait={true}
	   playFromPositionMillis={0}
	 />
	 */
 }
	 <TouchableOpacity
	 		onPress={() => this.onClick()}
	 >
	 <Text   style={styles.button}>Share</Text>
	 </TouchableOpacity>


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

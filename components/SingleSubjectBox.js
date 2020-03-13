import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, AsyncStorage,
        StyleSheet, TextInput, View, Text, Image,
        Platform, TouchableOpacity, Linking } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import Colors from '../constants/Colors';



export default class SingleSubjectBox extends Component {

  render() {
    var styles = StyleSheet.create({
    	text:{
        marginLeft:10,
        flex:.9,
        flexDirection:'row'
      },
      box:{
        flexDirection:'row',
        height:60,
        alignItems:'center',
        backgroundColor:'white',
        marginVertical:5
      },
      icon:{
        justifyContent: 'flex-start',
        marginLeft:10,
        flex:.1,

      }
    });
    return (
  <View style={styles.box}>

    <View style={styles.text}>
      <Text style={{fontSize:18,color:Colors.mainColor,
      fontFamily:'myfont',
      fontWeight:'bold'}}>{this.props.name.split("/")[0]}</Text>
      <Text style={{fontSize:18,color:'black',
      fontFamily:'myfont',
      fontWeight:'bold'}}>{this.props.name.split("/")[1]}</Text>
    </View>
    <View style={styles.icon}>
    <Ionicons
        name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-dropright'}
        size={35}
        color={Colors.mainColor}
        />
    </View>
  </View>
);

  }






}

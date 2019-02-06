import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class SingleNoteBox extends Component {
	render() {
		return (
			<View
				style={{
					backgroundColor: '#FFF',

					padding: 13,
					paddingHorizontal: 20,

				}}>
				<Image
					style={{ flex: 1, height: 130, borderRadius: 10 }}
					source={{ uri: this.props.image }}
				/>
				<Text
					style={{
						fontFamily: 'myfont',
						marginLeft: 5,
						fontSize: 17,
						padding: 5,
						fontWeight: 'bold',
            color:Colors.mainColor
					}}>
					{this.props.name}
				</Text>
				<Text
					style={{
						fontFamily: 'myfont',
            marginLeft: 11,
						fontSize: 12,
						padding: 0,
						color: 'gray'
					}}>
					{this.props.desc}
				</Text>
				<View
					style={{
						flex: .1,
						flexDirection: 'row',
            justifyContent:'flex-end'
					}}>
					<MaterialCommunityIcons
						name="cash-multiple"
						size={22}
						color={Colors.secondaryColor}
					/>
					<Text
						style={{
							marginLeft: 4,
              marginTop:4,
							fontFamily: 'myfont',
							fontSize: 12,
							color: Colors.secondaryColor
						}}>
						{this.props.price}
					</Text>
				</View>

			</View>
		);
	}
}

import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';
import Header from '../components/Header';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ContactusScreen from '../screens/SettingsScreen';
import MyNotes from '../screens/MyNotesScreen';
import MyVideos from '../screens/MyVideosScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Notes: {
      screen: MyNotes,
    },
    Videos: {
      screen: MyVideos,
    },
    Settings: {
      screen: ContactusScreen,
    },

  },
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home`
                : 'md-home';
            break;
          case 'Notes':
            iconName = Platform.OS === 'ios' ? `ios-link` : 'md-link';
            break;
          case 'Videos':
            iconName = Platform.OS === 'ios' ? `ios-link` : 'md-link';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios' ? `ios-information-circle-outline` : 'md-information-circle';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,

  }
);

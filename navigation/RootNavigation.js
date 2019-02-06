import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import SubjectsScreen from '../screens/SubjectsScreen';
import NotesScreen from '../screens/NotesScreen'
import ImagesScreen from '../screens/ImagesScreen'
import BuyScreen from '../screens/BuyScreen'
import ViewVideo from '../screens/ViewVideo'

import SearchScreen from '../screens/SearchScreen'
import SectorsScreen from '../screens/SectorsScreen'
import FreeNotesScreen from '../screens/FreeNotesScreen'
import SingleNoteScreen from '../screens/SingleNoteScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
const RootStackNavigator = StackNavigator(
  {
    WelcomeScreen: {screen: WelcomeScreen},
    Main: {screen: MainTabNavigator},
    SubjectsScreen: {screen: SubjectsScreen},
    NotesScreen: {screen: NotesScreen},
    ImagesScreen: {screen: ImagesScreen},
    BuyScreen: {screen: BuyScreen},
    ViewVideo: {screen: ViewVideo},

    SearchScreen: {screen: SearchScreen},
    SectorsScreen: {screen: SectorsScreen},
    FreeNotesScreen: {screen: FreeNotesScreen},
    SingleNoteScreen: {screen: SingleNoteScreen},

  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}

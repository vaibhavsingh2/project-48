import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import Exchange from '../screens/Exchange';


export const AppTabNavigator = createBottomTabNavigator({
  HomeScreen : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarLabel : "HomeScreen",
    }
  },
  BookRequest: {
    screen: Exchange,
    navigationOptions :{
      tabBarLabel : "Exchange",
    }
  }
});


export default AppTabNavigator;
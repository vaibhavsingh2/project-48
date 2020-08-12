import {Icon} from 'react-native-elements';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSidebarMenu  from './CustomSidebarMenu';
import React from 'react';
export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
  navigationOptions:{
    drawerIcon: <Icon name="home" type="fontawesome5" />
  } 
  },
  
 
  
},
  {
    contentComponent:CustomSidebarMenu
  },
  {
    initialRouteName : 'Home'
  })

  export default AppDrawerNavigator;

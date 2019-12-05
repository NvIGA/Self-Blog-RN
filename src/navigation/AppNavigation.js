import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { PostScreen } from '../screens/PostScreen'
import { Platform } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { THEME } from '../theme'

const navOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
  }
}

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: PostScreen
  },
  navOptions
)

const BookedNavigator = createStackNavigator(
  {
    Booked: BookedScreen,
    Post: PostScreen
  },
  navOptions
)

const bottomTabConfigs = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: 'All',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-albums' size={25} color={tintColor} />
      )
    }
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarLabel: 'Favorite',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-star' size={25} color={tintColor} />
      )
    }
  }
}

const BottomNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(bottomTabConfigs, {
        activeTintColor: '#fff',
        shifting: true,
        barStyle: {
          backgroundColor: THEME.MAIN_COLOR
        }
      })
    : createBottomTabNavigator(bottomTabConfigs, {
        tabBarOptions: {
          activeTintColor: THEME.MAIN_COLOR
        }
      })

const AboutNavigator = createStackNavigator(
  {
    About: AboutScreen
  },
  navOptions
)

const CreateNavigator = createStackNavigator(
  {
    Create: CreateScreen
  },
  navOptions
)

const MainNavigator = createDrawerNavigator(
  {
    PostsTabs: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerLabel: 'Main',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name='ios-home' size={20} color={tintColor} />
        )
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'About',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name='ios-information-circle' size={20} color={tintColor} />
        )
      }
    },
    Create: {
      screen: CreateNavigator,
      navigationOptions: {
        drawerLabel: 'Create post',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name='ios-camera' size={20} color={tintColor} />
        )
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: 'open-bold'
      }
    }
  }
)

export const AppNavigation = createAppContainer(MainNavigator)

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "./src/screens/SearchScreen";
import BusinessDetailScreen from "./src/screens/BusinessDetailScreen";
import BusinessListScreen from "./src/screens/BusinessListScreen";
import { Image } from "react-native";

const navigator = createStackNavigator({
    Search: SearchScreen,
    BusinessDetail: BusinessDetailScreen,
    BusinessList: BusinessListScreen
}, {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
        headerTitle: (<Image style={{ height: 30, width: 180}} source={require('./src/assets/img/wheres-the-food-logo.png')} /> ),
        headerStyle: {
            backgroundColor: '#00c6ff',
            elevation: 0,
            shadowOpacity: 0
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: '500',
            color: '#ffffff',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 2
        }
    }
});

export default createAppContainer(navigator);

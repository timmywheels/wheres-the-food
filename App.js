import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "./src/screens/SearchScreen";
import BusinessDetailScreen from "./src/screens/BusinessDetailScreen";
import BusinessListScreen from "./src/screens/BusinessListScreen";

const navigator = createStackNavigator({
    Search: SearchScreen,
    BusinessDetail: BusinessDetailScreen,
    BusinessList: BusinessListScreen
}, {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
        title: "Where's the Food?"
    }
});

export default createAppContainer(navigator);

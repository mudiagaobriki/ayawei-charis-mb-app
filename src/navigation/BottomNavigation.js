import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import NewTransaction from "../screens/NewTransaction";
import NavigationNames from "./NavigationNames";
import Reports from "../screens/Reports";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={NavigationNames.Home}
                           screenOptions={({ route }) => ({
                               tabBarIcon: ({ focused, color, size }) => {
                                   let iconName;

                               if (route.name === NavigationNames?.Home) {
                                       iconName = focused
                                           ? 'home-outline'
                                           : 'home';
                                   } else if (route.name === NavigationNames?.Reports) {
                                       iconName = focused ? 'checkbox-outline' : 'checkbox';
                                   } else if (route.name === NavigationNames?.NewTransaction) {
                                   iconName = focused ? 'add-outline' : 'add';
                               }

                                   // You can return any component that you like here!
                                   return <Ionicons name={iconName} size={20} color={color} />;
                               },
                               tabBarActiveTintColor: 'tomato',
                               tabBarInactiveTintColor: 'gray',
                           })}
            >
                <Tab.Screen name={NavigationNames.Home} component={Home}  />
                <Tab.Screen name={NavigationNames.Reports} component={Reports} />
                <Tab.Screen name={NavigationNames.NewTransaction} component={NewTransaction} options={{title: "New Transaction"}} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

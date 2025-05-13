import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTransaction from './AddTransaction';
import ListStack from '../navigation/ListStackNavigation';
import Summary from './Summary';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarShowLabel: false, 
        headerShown: false,
        tabBarStyle: { backgroundColor: '#E6E6FA'}
        }}>
        <Tab.Screen name="Summary" component={Summary} 
        options={{
            tabBarIcon: ( {size}) => (
                <MaterialCommunityIcons name='home-outline' color={'#9370DB'} size={size}/>
            )
        }} />
        <Tab.Screen name="List" component={ListStack} 
        options={{
            tabBarIcon: ( {size}) => (
                <MaterialCommunityIcons name='clipboard-list-outline' color={'#9370DB'} size={size}/>
            )
        }} />
        <Tab.Screen name="AddNew" component={AddTransaction} options={{
            tabBarIcon: ( {size}) => (
                <MaterialCommunityIcons name='clipboard-plus-outline' color={'#9370DB'} size={size}/>
            )
        }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})
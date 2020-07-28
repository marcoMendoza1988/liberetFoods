import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';

export default function Navigation() {
  
const Stack = createStackNavigator();

  return (
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

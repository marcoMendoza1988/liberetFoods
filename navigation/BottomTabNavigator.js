import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { 
  Text, 
  Dimensions,
  StyleSheet, 
  Alert, 
} from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import TabOneScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/ProfileScreen';
import { Block, Button } from 'galio-framework';

const BottomTab = createBottomTabNavigator();
const { width } = Dimensions.get('screen');

export default function BottomTabNavigator({navigation}) {

  /*React.useLayoutEffect(() => {
    navigation.setOptions({
      
    });
  }, [navigation]);*/

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{ activeTintColor: Colors['light'].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-cart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-contact" color={color} />,
          headerShown: false 
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={TabOneScreen}
        options={{ title: '', headerLeft: () => (
          <Button flex middle space="between" shadowless style={[styles.tab]} onPress={()=> {
              Alert.alert(
              'Platillo',
              'Select location...',
              [
                  {
                  text: 'Ask me later',
                  onPress: () => console.log('Ask me later pressed')
                  },
                  {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                  },
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
              ],
              { cancelable: false }
              );
          }}>
            <Block row width={width}>
                <Entypo name="location-pin" size={24} style={{color:"#F49897", paddingRight: 10, paddingLeft: 5 }} />
                <Text muted style={styles.tabTitle}>Select location...</Text>
                <Feather style={{position: 'absolute',right: 10}} name="wifi" size={24} color="black" />
            </Block>
        </Button>
        ), }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="HomeScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
      backgroundColor: 'transparent',
      width: width * 0.50,
      borderRadius: 0,
      borderWidth: 0,
      height: 55,
      elevation: 1,
      width: '100%',
  },
  tabTitle: {
      lineHeight: 19,
      color: '#C4C4C3'
  },
});

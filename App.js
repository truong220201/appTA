import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {enableScreens} from 'react-native-screens';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import front from './app/screens/front';
import chontrinhdo from './app/screens/chontrinhdo';
//layer trang chủ 
import Home from './app/screens/Home';
//layer sau khi ấn vào từng danh mục tại menu
import menuScreen from './app/screens/menuScreen';
//layer footer
import bTabs from './bottomTabs';
//layer hướng dẫn trước khi kiểm tra
import huongdan from './app/screens/huongdan';
//layer kiểm tra
import testScreen from './app/screens/testScreen';
//test


const Stack = createNativeStackNavigator();
//set màu cho screen
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'red',
  },
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='front' screenOptions={{headerShown: true}}>
        <Stack.Screen name = "front" component = {front} options={{headerShown: false}} />
        <Stack.Screen name = "chontrinhdo" component = {chontrinhdo} options={{title:''}} />
        <Stack.Screen name = "home" component = {Home} options={{headerShown: false}} />
        <Stack.Screen name = "menuScreen" component = {menuScreen}  options={{title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'white'}}  />
        <Stack.Screen name = "huongdan" component = {huongdan}  options={{title:'',headerTransparent:true,headerShadowVisible:false,headerTintColor:'black'}} />

        <Stack.Screen name = "testScreen" component = {testScreen} options={{title : '',headerShadowVisible:false,
        headerStyle:{
            backgroundColor:'#fff',
        },
        headerRight:()=>(<TouchableOpacity >
                          <Text>Nộp bài</Text>
                        </TouchableOpacity>)
        }} />
        
        <Stack.Screen name = "btab" component = {bTabs} options={{headerShown: false}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

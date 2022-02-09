import React, { useState } from 'react';
import { Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

export default class chontrinhdo extends React.Component{ 
    
  render(){
    return (
    <LinearGradient colors={[ '#6bdb91' , '#6bdb91' , '#73e9bb' , '#b9f5dc']} style={styles.container}>
        <View style = {styles.vw1}>
            <Text style={{color:'black',fontSize:50}}>Chọn trình độ của bạn</Text>
        </View>
        <View style={styles.vw2}>
        </View>
        <View style={styles.vw3}>
        </View>
        
    </LinearGradient>
)
}};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'center',
      padding:'5%'
    },
    vw1:{
        flex:2,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
    },
    vw2:{
        flex:3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        justifyContent:'flex-end',
        borderWidth:1,
    },
    vw3:{
        flex:3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        justifyContent:'flex-end',
        borderWidth:1,
    }
  });

import React, { useState } from 'react';
import { Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default class DanhSach extends React.Component{ 
    
  render(){
    const { navigation } = this.props;
    return (
    <ImageBackground style = {styles.vw1a} source={{uri:'https://w0.peakpx.com/wallpaper/194/510/HD-wallpaper-just-study-saying.jpg'}}>
    <LinearGradient colors={[ '#6bdb919e' , '#6bdb919e' , '#73e9bb9e' , '#b9f5dc9e']} style={styles.container}>
        <View style = {{flex:5,width:'100%',alignItems:'center',top:100}}>
            <Animatable.Text animation="slideInDown" iterationCount={1} direction="alternate">
                <Text style={{color:'#fff',fontSize:50,}}>Learn English</Text>
            </Animatable.Text>
        </View> 
        <View style={{flex:3,width:'100%',alignItems:'center',justifyContent:'center',justifyContent:'flex-end'}}>
            <TouchableHighlight style={styles.btnStart} onPress={()=>navigation.navigate('home',{uid:'0',email:'Anonymous'})} underlayColor="white">
                <View>
                    <Text style={styles.btnTextStart}>BẮT ĐẦU MÀ KHÔNG DÙNG TÀI KHOẢN</Text>
                </View> 
            </TouchableHighlight>
            <TouchableHighlight style={styles.btnLoggin} onPress={()=>navigation.navigate('dangnhap')} underlayColor="white">
                <View>
                    <Text style={styles.btnTextLoggin}>ĐĂNG NHẬP</Text>
                </View>
            </TouchableHighlight>
        </View>
        
    </LinearGradient>
    </ImageBackground>
)
}}; 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
      },
      vw1a:{
          height:'100%',
          width:'100%',
          zIndex:100,
          flexDirection:'column',
          borderRadius:20,
      },
    btnStart: {
        marginBottom: 20,
        width: '90%',
        height:'17%',
        alignItems: 'center',
        backgroundColor: '#6bdb90',
        justifyContent:'center',
        borderRadius:30,
        elevation:2,
    },
    btnLoggin: {
        marginBottom: 30,
        width: '90%',
        height:'17%',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent:'center',
        borderRadius:30,
        elevation:2,
    },
    btnTextStart: {
        textAlign: 'center',
        color: 'white',
        fontSize:18,
    },
    btnTextLoggin: {
        textAlign: 'center',
        color: '#69d69e',
        fontSize:20,
    }
  });

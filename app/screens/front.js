import React, { useState } from 'react';
import { Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';


export default class DanhSach extends React.Component{ 
    
  render(){
    const { navigation } = this.props;
    return (
    <LinearGradient colors={[ '#6bdb91' , '#6bdb91' , '#73e9bb' , '#b9f5dc']} style={styles.container}>
        <View style = {{flex:5,width:'100%',alignItems:'center',justifyContent:'center'}}>

            <Text style={{color:'#fff',fontSize:50}}>Learn English</Text>
        </View>
        <View style={{flex:3,width:'100%',alignItems:'center',justifyContent:'center',justifyContent:'flex-end'}}>
            <TouchableHighlight style={styles.btnStart} onPress={()=>navigation.navigate('btab')} underlayColor="white">
                <View>
                    <Text style={styles.btnTextStart}>BẮT ĐẦU</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btnLoggin} onPress={this._onPressButton} underlayColor="white">
                <View>
                    <Text style={styles.btnTextLoggin}>ĐĂNG NHẬP</Text>
                </View>
            </TouchableHighlight>
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
        fontSize:20,
    },
    btnTextLoggin: {
        textAlign: 'center',
        color: '#69d69e',
        fontSize:20,
    }
  });

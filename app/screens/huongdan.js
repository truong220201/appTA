import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';


export default class huongdan extends React.Component{ 
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { navigation,route } = this.props;
    const { id,name,ten} = route.params;
    return (
    <View style={styles.container}>
        <View style={styles.vw1}>
            <Text style={styles.txtTitle}>Test: {ten}</Text>
        </View>
        <View style={styles.vw2}>
            <View style={styles.yellowView}>
                <View style={styles.iconA}>
                    <Icon name = {'lock-clock'} size={40} color={'orange'} />
                </View>
                <View style={styles.contentA}>
                    <Text style={styles.txtA}>Thời gian</Text>
                    <Text style={styles.txtB}>45 Phút</Text>
                </View>
            </View>
            <View style={styles.blueView}>
                <View style={styles.iconA}>
                    <Icon name = {'contact-support'} size={40} color={'#4c93f9'} />
                </View>
                <View style={styles.contentA}>
                    <Text style={styles.txtA}>Số câu</Text>
                    <Text style={styles.txtB}>50</Text>
                </View>
            </View>
        </View>
        <View style={styles.vw3}>
            <View style={styles.contentView}>
                <View style={styles.viewTxtC}>
                    <Icon name = {'content-paste'} size={40} color={'#656565'} style={{margin:5,}} />
                    <Text style={styles.txtC}>Hướng dẫn</Text>
                </View>
                <View>
                    <Text style={styles.txtD}>1. Trả lời đúng câu hỏi để được điểm</Text>
                    <Text style={styles.txtD}>2. Trả lời sai không bị trừ điểm</Text>
                    <Text style={styles.txtD}>3. Nộp bài để nhận kết quả</Text>
                </View>
            </View>
        </View>
        <View style={styles.vw4}>
            <TouchableOpacity onPress={()=>navigation.navigate('testScreen',{baitap: id,n:1,ten:ten})} style={styles.btnStart}>
                <Text style={styles.txtStart}>Làm bài</Text>
            </TouchableOpacity>
        </View>
    </View>
)
}};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'center',
      zIndex:1,
    },
    txtTitle:{
        top:40,
        margin:10,
        fontSize:24,
    },
    vw1:{
        justifyContent:'center',
        width:'100%',
        flex:2,
        
    },
    vw2:{
        width:'100%',
        flex:2,
        flexDirection:'row',
        alignItems:'center'
    },
    vw3:{
        width:'100%',
        flex:5,
        padding:10,
    },
    vw4:{
        width:'100%',
        flex:2,
        alignItems:'center',
    },
    yellowView:{
        flex:1,
        borderWidth:2,
        height:'60%',
        borderColor:'#e97430',
        margin:10,
        borderRadius:20,
        flexDirection:'row',
        padding: 10,
    },
    blueView:{
        flex:1,
        borderWidth:2,
        height:'60%',
        borderColor:'#4c93f9',
        margin:10,
        borderRadius:20,
        flexDirection:'row',
        padding: 10,
    },
    iconA:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    contentA:{
        flex:2,
        justifyContent:'center',
    },
    txtA:{
        fontSize:17,
        color:'#7e7e7e',
    },
    txtB:{
        fontSize:18,
        fontWeight:'bold'
    },
    viewTxtC:{
        flexDirection:'row',
    },
    txtC:{
        fontSize:25,
        top:8,
        color:'#656565',
    },
    txtD:{
        fontSize:19,
        marginTop:5,
        marginBottom:5,
        color:'#656565',
    },
    contentView:{
        borderWidth:3,
        borderColor:'#f0f0f0',
        borderRadius:20,
        padding:20,
    },
    btnStart:{
        width: '50%',
        height:'40%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        backgroundColor:'#6ee0a0',
        elevation:2,
    },
    txtStart:{
        color:'#fff',
        fontSize:18,
        textShadowColor: '#ffffffb3',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    }   
    
  });

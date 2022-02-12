import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import HTMLView from 'react-native-htmlview';


export default class Home extends React.Component{ 
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        this.state = {
            keys:[],
            item:[],
            nameqs:[],
            leng:0,
            };
      }
      async listenForItems(itemRef){
        const db = getFirestore(firebaseApp);
        //console.log(db);
        //const docRef = doc(db, "Quiz", "03ZnOo7bgWhJvJU9Th9G");
        //const docSnap = await getDoc(docRef);
        const querySnapshot = await getDocs(collection(db, "QaA_Category"));
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          //console.log(`${doc.data().Title}`);
          //console.log(`length: ${doc.id.length}`)
          this.setState({
            //item:this.state.item.push(data)
            //item:Object.keys(`${doc.data().Title}`)
            keys:[...this.state.keys,`${doc.id}`],
            item:[...this.state.item,`${doc.data().name}`],
            nameqs:[...this.state.item,`${doc.data().name_Question}`],
            leng:`${doc.id.length}`
          })
        
        });
        //console.log('item:'+this.state.item);
        //console.log('length:'+this.state.leng);
    }
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { navigation } = this.props;
    var l = this.state.leng;
    //console.log(this.state.keys);
    
    return (
    <LinearGradient colors={[ '#aef6d6' , '#fff' , '#fff' , '#fff']} style={styles.container}>
        <View style = {styles.vw1}>
            <Icon name='list' style={{marginRight:10,}}/>
            <Text style={{color:'black',fontSize:20,fontWeight:'bold',}}>Giáo trình chính</Text>
        </View>
        <View style={styles.vw2}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{height:80,}}></View>
                <View style={styles.content} >
                {
                    //Số hàng ngang
                    [...Array(2)].map((o,n) => {
                        return(
                            /*
                            <View key={n} style={{height:windowHeight/4,padding:20,flexDirection:'row'}}>
                                {
                                    //Số phần tử nằm trong hàng ngang đó 
                                    [...Array(2)].map((o,n) => {
                                        //Lấy id sau khi click
                                        return(
                                            <TouchableOpacity key={n} onPress={()=>navigation.navigate('menuScreen',{loaiId: 1})} style={{flex:1,alignItems:'center'}}>
                                                <Image
                                                    style={styles.circle}
                                                    source={{uri:'https://www.clipartmax.com/png/middle/171-1715839_purchase-book-icon-book-icon-green-png.png'}}
                                                />
                                                <View style={styles.vTxtLoai}>
                                                    <Text style={styles.txtLoai}>Phát âm</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                    )
                                }
                            </View>
                            */
                            <View key={n} style={{height:windowHeight/4,padding:20,flexDirection:'row'}}>
                                <TouchableOpacity key={n} onPress={()=>navigation.navigate('menuScreen',{loaiId: 1,ten:this.state.item[n],name:this.state.nameqs[n],id:this.state.keys[n],})} style={{flex:1,alignItems:'center'}}>
                                    <Image
                                        style={styles.circle}
                                        source={{uri:'https://www.clipartmax.com/png/middle/171-1715839_purchase-book-icon-book-icon-green-png.png'}}
                                    />
                                    <View style={styles.vTxtLoai}>
                                        <HTMLView value={this.state.item[n]}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    )
                }
                </View>

            </ScrollView>
        </View>
        
    </LinearGradient>
)
}
componentDidMount(){
    this.listenForItems(this.itemRef);
}
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    vw1:{
        height:100,
        padding:10,
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        paddingTop:20,
        backgroundColor:'#f5f5f500',
        position:'absolute',
        zIndex:100,
    },
    vw2:{
        flex:11,
        width:'100%',
    },
    content:{
        alignItems:'center',
        justifyContent:'center'
    },
    circle:{
        borderWidth:1,
        width:100,
        height:100,
        borderRadius:50
    },
    vTxtLoai:{
        alignItems:'center',
        padding:10,
        
    },
    txtLoai:{
        color:'#757575',
        fontSize:17,
        fontWeight:'bold'
    }
  });

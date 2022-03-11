import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground,ActivityIndicator } from 'react-native';
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
        const { route,navigation } = this.props;
        const { uid,email} = route.params;
        this.uid=uid;
        this.email=email;
        console.log(uid,email);
        this.state = {

            keys:[],
            item:[],
            nameqs:[],
            leng:0,
            isLoading:true,
            loadingIMG:true,
            };
      }
    async listenForItems(itemRef){
        const db = getFirestore(firebaseApp);
        //console.log(db);
        //const docRef = doc(db, "Quiz", "03ZnOo7bgWhJvJU9Th9G");
        //const docSnap = await getDoc(docRef);
        const querySnapshot = await getDocs(collection(db, "Category_Dang_Kien_Thuc"));
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          //console.log(`${doc.data().Title}`);
          //console.log(`id: ${doc.id}`)
          this.setState({
            //item:this.state.item.push(data)
            //item:Object.keys(`${doc.data().Title}`)
            keys:[...this.state.keys,`${doc.id}`],
            item:[...this.state.item,`${doc.data().Name}`],
            //nameqs:[...this.state.item,`${doc.data().name_Question}`],
            leng:`${doc.id.length}`,
            isLoading:false

          })
        });
        //console.log('phan tu dau tien : ',this.state.keys[1]);
        //console.log('item:'+this.state.item);
        //console.log('length:'+this.state.leng);

    }
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { route,navigation } = this.props;
    var l = this.state.leng;
    //console.log(this.state.keys);
    
    return (
    <LinearGradient colors={[ '#fff' , '#fff' , '#fff' , '#fff','#fff','#fff']} style={styles.container}>
        <LinearGradient colors={[ '#aef6d6c9' , '#aef6d68f' , '#aef6d659' , '#ffffff00']}  style = {styles.vw1}>
            
            <View>
                <Text style={{color:'#51ab41',fontSize:20,fontWeight:'bold',marginLeft:20,}}>Giáo trình chính</Text>
            </View>
        </LinearGradient>
        {this.state.isLoading ? <View style={{alignItems:'center',justifyContent:'center',top:350}}><Text>Đang nạp dữ liệu, bạn chờ xíu nhé...</Text><ActivityIndicator size="large" color="#00ff00" /></View>:(
            <View style={styles.vw2}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={{height:80,}}></View>
                <View style={styles.content} >
                {
                    //Số hàng ngang
                    [...Array(12)].map((o,n) => {
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
                            <View key={n} style={{height:windowHeight/4,padding:20,width:windowWidth/3,}}>
                                <TouchableOpacity key={n} onPress={()=>navigation.navigate('luachon',{loaiId: 1,ten:this.state.item[n],id:this.state.keys[n],uid:this.uid,email:this.email})} style={{flex:1,alignItems:'center'}}>
                                
                                    <Image
                                        style={styles.circle}
                                        source={{uri:'https://www.clipartmax.com/png/middle/171-1715839_purchase-book-icon-book-icon-green-png.png'}}
                                        //onLoadEnd={ ()=>{ console.log('load xong') }}
                                    />
                                    <View style={styles.vTxtLoai} >
                                        <HTMLView value={this.state.item[n]}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    )
                }
                </View>

            </ScrollView >
            <View style={styles.footer}>
              <TouchableOpacity  style={styles.c4} onPress={()=>null}>
                  <Icon style = {{}} name="home" size={25} color="#6bdb91"
                  />
              </TouchableOpacity>
              <TouchableOpacity  style={styles.c4} onPress={()=>navigation.navigate('ps', {uid:this.uid,email:this.email})}>
                  <Icon style = {{}} name="person" size={25} color="grey"
                  />
              </TouchableOpacity>
            </View>
        </View>
        )}
        
        
    </LinearGradient>
)
}
componentDidMount(){
    this.listenForItems(this.itemRef);
}
};
const styles = StyleSheet.create({
    footer: {
        height:60,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection:'row',
        elevation:3,
      },
      c4: { 
        padding:10,
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
      },
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
        justifyContent:'center',
        width:'100%',
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

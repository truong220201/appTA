import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import HTMLView from 'react-native-htmlview';
import * as Animatable from 'react-native-animatable';

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
    const { uid,email} = route.params;
    var l = this.state.leng;
    //console.log(this.state.keys);

    //trai sang phai va phai sang trai
        const tsp = {
        from: {
          opacity: 0,
          left:700,
        },
        to: { 
          opacity: 1,
          left:0
        },
      }; 
      const pst = {
        from: {
          opacity: 0,
          left:-700,
        },
        to: { 
          opacity: 1,
          left:0
        },
      }; 
      const zoomIn = {
        0: {
          opacity: 0,
          scale: 0,
        },
        0.5: {
          opacity: 1,
          scale: 0.3, 
        }, 
        1: {  
          opacity: 1,
          scale: 1,
        },
      };
    return (
    
    <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[ '#aef6d6a6' , '#ffffff' , '#ffffff' , '#aef6d6a6']} style={styles.container}>
        
        <View style={{width: windowWidth,height:windowHeight,alignItems:'center'}}>
        <ImageBackground style = {{height:170,
        width:windowWidth,
        backgroundColor:'#f5f5f500',
        zIndex:100,
        flexDirection:'column',
        borderRadius:20,
        borderWidth:1}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYO0u07nDm35gsnfEO-zxF_ev6HpLrGT_mJQ&usqp=CAU'}}>
            <LinearGradient   start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[ '#ffffff00' , '#ffffffc4' , '#ffffffc4' , '#aef6d6']}  style = {styles.vw1}>
                
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:20,marginBottom:10,}}>
                    <View style={{width:60,height:60,borderRadius:5,backgroundColor:'#fff'}}>
                    <Image
                        style={{
                            width:60,
                            height:60,
                            borderRadius:50, 
                            borderWidth:2,
                            borderColor:'green'

                        }}
                        source={{uri:'https://www.iconsdb.com/icons/preview/green/user-4-xxl.png'}}
                    />
                    </View> 
                    <View style={{width: '100%',height:60,justifyContent:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            
                            <Text style={{color:'#475b52',fontSize:15,fontWeight:'bold',marginLeft:20,marginBottom:5,}}>Xin chào,</Text>
                            <Text style={{color:'#51ab41',fontSize:windowWidth/30,fontWeight:'bold',marginLeft:5,marginBottom:5,}}>{email}</Text>
                        </View>
                        <View style={{borderWidth:1,marginLeft:20,width: '75%',borderColor:'#9ab69373'}}></View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#475b52',fontSize:15,fontWeight:'bold',marginLeft:20,marginTop:5}}>Id:</Text>
                            <Text style={{color:'#51ab41',fontSize:windowWidth/30,fontWeight:'bold',marginLeft:5,marginTop:5}}>{uid}</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{position:'absolute',top:'68%',left:'70%',flexDirection:'row'}}>
                    
                    <TouchableOpacity onPress={()=>navigation.navigate('huongdan', {id:[1],ten:'anonymous',uid:1,email:'email',socau:50,tg:50})} style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:40,marginLeft:40,}}>
                        <Image
                            style={{
                                width:50,
                                height:50,
                                borderRadius:50
                            }}
                            source={{uri:'https://cdn-icons-png.flaticon.com/512/1043/1043703.png'}}
                        />
                        <Text style={{color:'#475b52',fontSize:13,fontWeight:'bold'}}>50'</Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
        </ImageBackground> 
        <View style={{margin:5,}}>
            <Text style={{color:'#475b52',fontSize:20,fontWeight:'bold',}}>Giáo trình chính</Text>
        </View>
        {this.state.isLoading ? <View style={{alignItems:'center',justifyContent:'center',top:200}}><Text>Đang nạp dữ liệu, bạn chờ xíu nhé...</Text><ActivityIndicator size="large" color="#00ff00" /></View>:(
            <View style={styles.vw2}>
            
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={{height:10}}></View>
                <View style={styles.content} >
                {
                    //Số hàng ngang
                    [...Array(12)].map((o,n) => {
                        if(n%4==0){
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
                            
                                <View key={n} style={{height:windowHeight/6,padding:20,width:windowWidth}}>
                                    <TouchableOpacity key={n} onPress={()=>navigation.navigate('luachon',{loaiId: 1,ten:this.state.item[n],id:this.state.keys[n],uid:this.uid,email:this.email})} style={{flex:1,alignItems:'center'}}>
                                        <Animatable.Text animation={tsp} style={styles.circle}>
                                            <View>
                                            
                                            <Image
                                                style={styles.circle}
                                                source={{uri:'https://cdn-icons-png.flaticon.com/512/1903/1903162.png'}}
                                                //onLoadEnd={ ()=>{ console.log('load xong') }}
                                            />

                                            </View>  
                                        </Animatable.Text> 

                                        <View style={styles.vTxtLoai} >
                                            <Animatable.Text animation={pst} >
                                                <HTMLView value={this.state.item[n]}/> 
                                            </Animatable.Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        )
                        }else{
                            if(n==3 || n==7 ||n==5 || n==1){
                            return(
                                <View key={n} style={{height:windowHeight/6,padding:0,width:windowWidth/2,}}>
                                    <TouchableOpacity key={n} onPress={()=>navigation.navigate('luachon',{loaiId: 1,ten:this.state.item[n],id:this.state.keys[n],uid:this.uid,email:this.email})} style={{flex:1,alignItems:'center'}}>
                                        <Animatable.Text animation={tsp} style={styles.circle}>
                                            <View>
                                            <Image
                                                style={styles.circle}
                                                source={{uri:'https://cdn-icons-png.flaticon.com/512/201/201612.png'}}
                                                //onLoadEnd={ ()=>{ console.log('load xong') }}
                                            />
                                            </View>  
                                        </Animatable.Text>

                                        <View style={styles.vTxtLoai} >
                                            <Animatable.Text animation={pst} >
                                                <HTMLView value={this.state.item[n]}/> 
                                            </Animatable.Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                            }else{
                                return(
                                    <View key={n} style={{height:windowHeight/6,padding:0,width:windowWidth/2,}}>
                                        <TouchableOpacity key={n} onPress={()=>navigation.navigate('luachon',{loaiId: 1,ten:this.state.item[n],id:this.state.keys[n],uid:this.uid,email:this.email})} style={{flex:1,alignItems:'center'}}>
                                            <Animatable.Text animation={tsp} style={styles.circle}>
                                                <View>
                                                <Image
                                                    style={styles.circle}
                                                    source={{uri:'https://cdn-icons-png.flaticon.com/512/4072/4072307.png'}}
                                                    //onLoadEnd={ ()=>{ console.log('load xong') }}
                                                />
                                                </View>  
                                            </Animatable.Text>
    
                                            <View style={styles.vTxtLoai} >
                                                <Animatable.Text animation={pst} >
                                                    <HTMLView value={this.state.item[n]}/> 
                                                </Animatable.Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        }
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
        
        </View>
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
        height:170,
        padding:10,
        width:'100%',
        backgroundColor:'#f5f5f500',
        zIndex:100,
        flexDirection:'column',
        paddingTop:40,
        borderWidth:2,
        borderColor:'white'
    },
    vw1a:{
        height:170,
        width:'100%',
        backgroundColor:'#f5f5f500',
        zIndex:100,
        flexDirection:'column',
        borderRadius:20,
        borderWidth:1
    },
    vw2:{
        flex:11,
        width:'100%',
    },
    content:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        flexWrap:'wrap',
        flexDirection:'row'
    },
    circle:{
        width:100,
        height:100,
        borderRadius:50,
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

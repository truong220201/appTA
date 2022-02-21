import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import HTMLView from 'react-native-htmlview';
import CheckBox from 'react-native-checkbox';


export default class luachon extends React.Component{ 
    constructor(props) {
        super(props);
        const { route,navigation } = this.props;
        this.nvt = navigation;
        const {id} = route.params;
        console.log("tesst id",id);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        this.thing = id;
        this.state = {
            borderColorC:[],
            savet:[],
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
        const querySnapshot = await getDocs(collection(db, "Category_Don_vi_kien_thuc"));
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          //console.log(`${doc.data().Title}`);
          //console.log(`length: ${doc.id.length}`)
        if(this.thing==`${doc.data().Id_category_dkt}`){
            this.setState({
                //item:this.state.item.push(data)
                //item:Object.keys(`${doc.data().Title}`)
                keys:[...this.state.keys,`${doc.id}`],
                item:[...this.state.item,`${doc.data().Name}`],
                //nameqs:[...this.state.item,`${doc.data().name_Question}`],
                leng:`${doc.id.length}`,
                savet:[...this.state.savet,0],
                borderColorC:[...this.state.borderColorC,"#ffffff00"],
              })
        }
         
        });
        //console.log('item:'+this.state.item);
        //console.log('length:'+this.state.leng);
    }
    nopbaia(n,a){
        console.log("Running");
        if(this.state.savet[a]==0){
            this.state.savet[a]=n;
            this.state.borderColorC[a]='green';
        }
        else{
            this.state.savet[a]=0;
            this.state.borderColorC[a]='#ffffff00';
        }
        //console.log('savet: ',this.state.savet);
        console.log('color: ',this.state.borderColorC);
    };
    chontc(cd){
        [...Array(cd)].map((o,n) => {
            this.state.savet[n]=this.state.keys[n];
            this.state.borderColorC[n]='green';
            
        })
        console.log('savet: ',this.state.savet);
    }
    btntieptuc(svet,cd){
        console.log('svet:',svet)
        let dem = 0;
        [...Array(cd)].map((o,n) => {
            if(this.state.borderColorC[n] !== '#ffffff00'){
                dem++;
            }
        })
        if(dem==0){
            Alert.alert(
                "Nhắc nhở",
                "Bạn chưa chọn mục nào.",
                [
                    {
                        text: "Được",
                        onPress: () => null,
                        style: "cancel",
                    },
                
                ],
            );
        }else{
            this.nvt.navigate('listbt',{listt:svet})
        }
        
    }
    componentDidMount(){

        this.listenForItems();
    }
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { navigation } = this.props;
    var l = this.state.leng;
    //console.log(this.state.keys);
    const chieudai = this.state.item.length;
    const colorsB = this.state.borderColorC;
    //console.log('chieu dai : ',chieudai);
    //console.log('color: ',colorsB)
    return (
    <LinearGradient colors={[ '#aef6d6' , '#aef6d6' , '#aef6d6' , '#fff']} style={styles.container}>
        <View style = {styles.vw1}>
            <Icon name='watch' style={{marginRight:10,}}/>
            <Text style={{color:'black',fontSize:20,fontWeight:'bold',}}>Kiến thức cần thiết cho bạn</Text>
        </View>
        <View style={styles.vw2}>
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View style={{height:80,}}></View>
                <View style={styles.content} >
                {
                    //Số hàng ngang
                    [...Array(chieudai)].map((o,n) => {
                            return(
                                <View key={n}>
                                    <TouchableOpacity style={{width:'95%',
                                                            height:80,
                                                            borderRadius:20,
                                                            margin: 10,
                                                            borderWidth:2,
                                                            borderColor:colorsB[0],
                                                            backgroundColor:'#fff',
                                                            elevation:1,
                                                            flexDirection:'row',}} key={n} onPress={()=>this.nopbaia(this.state.keys[n],n)} >
                                        <View style={{height:'100%',flex:4,justifyContent:'center'}}>
                                            <HTMLView value={this.state.item[n]}/>
                                        </View>
                                    </TouchableOpacity>      
                                </View>
                            )
                        }
                    )
                }
                <View >
                    <TouchableOpacity style={{width:'95%',
                                            height:80,
                                            borderRadius:20,
                                            margin: 10,
                                            borderWidth:2,
                                            borderColor:colorsB[0],
                                            backgroundColor:'#fff',
                                            elevation:1,
                                            flexDirection:'row',}} onPress={()=>this.chontc(chieudai)} >
                        <View style={{height:'100%',flex:4,justifyContent:'center'}}>
                            <Text>Chọn tất cả</Text>
                        </View>
                    </TouchableOpacity>      
                </View>
                </View>
                
            </ScrollView >
            <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[ '#6bdb91' , '#6bdb91' , '#6bdb91' , '#b9f5dc']}  style={{borderWidth:0,
                                                                                                                    height:50,
                                                                                                                    width:'95%',
                                                                                                                    alignSelf:'center',
                                                                                                                    borderColor:'#1CC625',
                                                                                                                    borderRadius:10,
                                                                                                                    marginBottom:'6%',
                                                                                                                    elevation:1,}} >
            <TouchableOpacity onPress={()=>this.btntieptuc(this.state.savet,chieudai)} style={{alignItems:'center',}}>
                <View style={{height:'100%',justifyContent:'center'}}>
                    <Text style={{fontSize:20,color:'#fff'}}>Tiếp tục</Text>
                </View>
            </TouchableOpacity>      
            </LinearGradient>

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
    square:{
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
    },
    btnInfo:{
        width:'95%',
        height:80,
        borderRadius:20,
        margin: 10,
        backgroundColor:'#fff',
        elevation:2,
        flexDirection:'row',
    }
  });
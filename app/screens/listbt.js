import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground,ActivityIndicator,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import HTMLView from 'react-native-htmlview';
import { CheckBox} from 'react-native-elements';


export default class listbt extends React.Component{ 
    constructor(props) {
        super(props);
        const { route,navigation } = this.props;
        this.nvt = navigation;
        const {listt,uid,email} = route.params;
        this.uid=uid;
        this.email=email;
        //console.log("tesst id list",listt)
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        this.thing = listt;
        //
        //
        console.log("things id list",this.thing)
        this.state = {
            savet:[0,0,0,0,0,0,0],
            keys:[],
            item:[],
            nameqs:[],
            leng:0,
            borderColorC:[],
            isLoading:true,
            check:[],
            chontca:false,
            //kiem tra xem co du lieu khong
            kiemtradulieu:0
            };
      }
      async listenForItems(itemRef){
        const db = getFirestore(firebaseApp);
        //console.log(db);
        //const docRef = doc(db, "Quiz", "03ZnOo7bgWhJvJU9Th9G");
        //const docSnap = await getDoc(docRef);
        const querySnapshot = await getDocs(collection(db, "Category_mo_ta_chi_tiet"));
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          //console.log(`${doc.data().Title}`);
          //console.log(`length: ${doc.data().Id_category_dvkt}`);
          [...Array(7)].map((o,n) => {
          if(this.thing[n]==`${doc.data().Id_category_dvkt}`){
            this.setState({
                //item:this.state.item.push(data)
                //item:Object.keys(`${doc.data().Title}`)
                keys:[...this.state.keys,`${doc.id}`],
                item:[...this.state.item,`${doc.data().Name}`],
                //nameqs:[...this.state.item,`${doc.data().name_Question}`],
                leng:`${doc.id.length}`,
                borderColorC:[...this.state.borderColorC,"#ffffff00"],
                isLoading:false,
                kiemtradulieu:1,
              })
        }})
            
         
        }
        );
        if(this.state.kiemtradulieu==0){
            console.log('ok')
            Alert.alert(
                "Thông báo",
                "Chưa có dữ liệu",
                [
                    {
                        text: "về trang chủ",
                        onPress: () => this.nvt.navigate('home'),
                        style: "cancel",
                    },
                
                ],
            );
        }
        //console.log('item:'+this.state.item);
        //console.log('length:'+this.state.leng);
    }
    nopbai(n,a){
        var arr = [...this.state.check];
        arr[a] = !this.state.check[a]
        this.setState({check:arr})
        console.log("Running, a = ",a);
        if(this.state.savet[a]==0){
            this.state.savet[a]=n;
        }
        else{
            this.state.chontca=false
            this.state.savet[a]=0;
        }
        console.log('savet: ',this.state.savet);
        //console.log('check: ',this.state.check);
        //console.log('color: ',this.state.borderColorC);
    };
    chontc(cd){
        var arr = [...this.state.check];
        if(this.state.chontca == false){
            [...Array(cd)].map((o,n) => {
                arr[n] = true;
                this.state.savet[n]=this.state.keys[n];
                
            })
        }else{
            [...Array(cd)].map((o,n) => {
                arr[n] = false;
                this.state.savet[n]=0;
                
            })
        }
        this.setState({check:arr})
        this.state.chontca = !this.state.chontca;
        console.log('savet: ',this.state.savet);
    }
    btntieptuc(svet,cd){
        console.log('svet:',svet)
        let dem = 0;
        [...Array(cd)].map((o,n) => {
            if(this.state.check[n] !== false){
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
            this.nvt.navigate('menuScreen',{id:this.state.savet,ten:this.state.item,uid:this.uid,email:this.email})
        }
        
    }
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { navigation } = this.props;
    var l = this.state.leng;
    const colorsB = this.state.borderColorC;
    //console.log(this.state.keys);
    const chieudai = this.state.item.length;
    //console.log('chieu dai : ',chieudai);
    return (
        <ImageBackground style={styles.container} source={{uri:'https://media.istockphoto.com/photos/open-book-hardback-books-on-wooden-table-education-background-back-picture-id591810668?k=20&m=591810668&s=612x612&w=0&h=XAE8mlyqycD2LLcptfWlaj-rXhl4JuZvohRBCI2fniU='}}>
    <LinearGradient colors={[ '#aef6d68a' , '#aef6d68a' , '#aef6d68a' , '#fff']} style={styles.inContainer}>
        <View style = {styles.vw1}>
        </View>
        {this.state.isLoading ? <ActivityIndicator style={styles.vw2} size="large" color="#00ff00" />:(
        <View style={styles.vw2}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={{height:80,}}></View>
                <View style={styles.content} >
                {
                    //Số hàng ngang
                    [...Array(chieudai)].map((o,n) => {
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
                            <View key={n}>

                                  <CheckBox
                                        title={<View style={{flexDirection:'row'}}><View style={{width:10}}></View><HTMLView value={this.state.item[n]}/></View>}
                                        checked={this.state.check[n]}
                                        onPress={() => this.nopbai(this.state.keys[n],n)}
                                        size={30}
                                        containerStyle={{borderRadius:10,backgroundColor:'#fff',elevation:4,borderWidth:0}}
                                        checkedColor='#009f00'
                                        uncheckedColor='#009f00'
                                    />      
                                                                                                             
                            </View>
                        )
                    }
                    )
                }
                
                </View>
                <View >
                <View >
                    <CheckBox
                        title='Chọn tất cả'
                        checked={this.state.chontca}
                        onPress={() => this.chontc(chieudai)}
                        size={30}
                        containerStyle={{borderRadius:10,backgroundColor:'#fff',borderWidth:0,borderColor:'#ffffff00',elevation:4,}}
                        checkedColor='#009f00'
                        uncheckedColor='#009f00'
                    />      
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
                <TouchableOpacity onPress={()=>this.btntieptuc(this.state.savet,this.uid)} style={{alignItems:'center',}}>
                    <View style={{height:'100%',justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'#fff'}}>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>      
                </LinearGradient>
                  
        </View>
        )}
       
    </LinearGradient>
    </ImageBackground>
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
    inContainer: {
        width:'100%',
        height:'100%',
        alignItems: 'center',
        justifyContent:'center',
        zIndex:2,
        padding:10,
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

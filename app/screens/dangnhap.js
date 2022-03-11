import React,{Component} from 'react';
import{
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Pressable,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from './color';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from '../../components/firebaseConfig';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { AsyncStorage } from 'react-native';

import { CheckBox} from 'react-native-elements';
//nho mat khau
//import * as Keychain from 'react-native-keychain';

const {width:WIDTH} =Dimensions.get('window');

export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        const { route,navigation } = this.props;
        this.nvt = navigation;
    }
    state = { email: '', password: '', errorMessage: null,uid:'',hidePass:true,iconPass:'eye-off-outline',nhoMK:false}

    dangnhap = () =>{
       //console.log('uid: ',this.state.uid)
        this.nvt.navigate('home',{uid:this.state.uid,email:this.state.email});
       
    }
    
    handleLogin = () => {
        //this.setItems()
        // TODO: Firebase stuff...
        
        //console.log('handleSignUp')
        const auth = getAuth(firebaseApp);
        //console.log('uid: ',auth.currentUser.uid);
            signInWithEmailAndPassword(auth, this.state.email, this.state.password)

          .then((userCredential) => {
            this.setState({
                uid:auth.currentUser.uid
            });
            //console.log(this.state.uid)
            Alert.alert(
              "Alert Title",
              "Dang nhap thanh cong",
              [
                { text: "OK", onPress: () => this.dangnhap() }
              ]
            );
          })
          .catch((error) => {
            Alert.alert(
              "Alert Title",
              "Tai khoan hoac mat khau khong chinh xac",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          });
        
        
     }
    
    anHienMk(){
        if(this.state.hidePass==true){
            this.setState({
                hidePass:false,
                iconPass:'eye-outline',
            })

        }else{
            this.setState({
                hidePass:true,
                iconPass:'eye-off-outline'
            })
        }
    }
    
   nhomatkhau(){
    this.setState({nhoMK : !this.state.nhoMK})
    
    this.luumk()
   }
   //luu mat khau
   async luumk(){
    console.log(this.state.email)
    if(this.state.nhoMK==true){
        const e = 'a';
        const p = 'b';
        this._storeData();
        
    }
    else{
        console.log('huy')
        //await Keychain.resetGenericPassword();
    }
   }
   _storeData = async () => {
  //  try {
      await AsyncStorage.setItem('TASKS', 'I like to save it.');
      console.log('nho mat khau')
   // } catch (error) {
      // Error saving data
      console.log('bug')
   // }
  };

    render(){
        const { navigation } = this.props;
        
    return(
        <LinearGradient  colors={[ '#6bdb91' , '#6bdb91' , '#73e9bb' , '#b9f5dc']} style={styles.backgroundContainer}>
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={styles.logoContainer}>
                <Text style={{color:'white',fontSize:25,fontWeight:'bold',marginTop:20,}}>Chào mừng bạn</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'person'} size={28} color={'#fff'} style={styles.inputIcon}/>
                    <TextInput style={styles.input}
                    placeholder={'Email'}
                    placeholderTextColor={'#7a7a7a'}
                    underlineColorAndroid='transparent'
                    onChangeText={email => this.setState({ email })}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'lock-closed-outline'} size={28} color={'#fff'} style={styles.inputIcon}/>
                    <TextInput style={styles.input}
                    placeholder={'Password'}

                    secureTextEntry={this.state.hidePass}
                    placeholderTextColor={'#7a7a7a'}
                    underlineColorAndroid='transparent'
                    onChangeText={password => this.setState({ password })}
                    />
                    <TouchableOpacity style={styles.btnEye} onPress={()=>this.anHienMk()}>
                        <Icon name={this.state.iconPass} size={26} color={'#fff'}  />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity  onPress={()=>navigation.navigate('dangky')}>
                    <Text style={{color:'white',fontSize:15,fontWeight:'bold',marginTop:20,}}>Chưa có tài khoản? Đăng ký ngay!</Text>
                </TouchableOpacity>
            </View>

            <View style={{justifyContent:'flex-end',flex:1,padding:10}}>
                <TouchableOpacity style={styles.btnLogin} onPress={this.handleLogin}>
                     <Text style={styles.text}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            
        </LinearGradient>
        
    );
    }
    
};

const styles = StyleSheet.create({
    backgroundContainer:{
        flex:1,
        width:null,
        height:null,
        alignItems:'center',
    },
    logo:{
        width:160,
        height:120,
        borderRadius:30,
    },
    logoContainer:{
        alignItems:'center',
        marginBottom:50,
    },
    logoText:{
        color:'white',
        fontSize:20,
        fontWeight:'500',
        marginTop:10,
        opacity:0.5,
    },
    input:{
        width:WIDTH -155,
        height:45,
        borderRadius:25,
        fontSize:16,
        paddingLeft:45,
        backgroundColor:'#fff',
        marginHorizontal:25,
        elevation:4,
    },
    inputIcon:{
        top:8,
        /*top:8,
        left:37,
        color:'#6bdb91'
        */
    },
    inputContainer:{
        marginTop:10,
        flexDirection:'row',
    },
    btnEye:{
        top:10,
        right:10,
    },
    btnLogin:{
        width:WIDTH -55,
        height:55,
        borderRadius:25,
        backgroundColor:"#fff",
        justifyContent:'center',
        elevation:5,
        marginTop:20,
    },
    text:{
        color:'#6bdb91',
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
    },
});

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
import Icon from 'react-native-vector-icons/Ionicons';

import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from '../../components/firebaseConfig';


const {width:WIDTH} =Dimensions.get('window')
export default class SignUpScreen extends React.Component{
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        const { route,navigation } = this.props;
        this.nvt = navigation;
    }
    state = { email: '', password: '', errorMessage: null, repass:''}
    
    handleSignUp = () => {
        // TODO: Firebase stuff...
        console.log('handleSignUp')
        const auth = getAuth(firebaseApp);
        console.log(auth);
        try{
            if(this.state.password.length<6){
                Alert.alert("Yeu cau mat khau nhieu hon 6 ky tu.")
                return;
            }
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
          .then((userCredential) => {
            Alert.alert(
              "Alert Title",
              "Dang ky thanh cong",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => this.nvt.navigate('dangnhap') }
              ]
            );
          })
          .catch((error) => {
            Alert.alert(
              "Alert Title",
              "Dang ky that bai",
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
        }catch(error){
            console.log(error)
        }
      }
    render(){
        const { navigation } = this.props;
    return(
        <LinearGradient  colors={[ '#6bdb91' , '#6bdb91' , '#73e9bb' , '#b9f5dc']} style={styles.backgroundContainer}>
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={styles.logoContainer}>
                <Text style={{color:'white',fontSize:25,fontWeight:'bold',marginTop:20,}}>Dang ky</Text>
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
                    secureTextEntry={true}
                    placeholderTextColor={'#7a7a7a'}
                    underlineColorAndroid='transparent'
                    onChangeText={password => this.setState({ password })}
                    />
                    <TouchableOpacity style={styles.btnEye}>
                        <Icon name='eye-outline'size={26} color={'rgba(0,0,0,0.8)'}  />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'lock-closed-outline'} size={28} color={'#fff'} style={styles.inputIcon}/>
                    <TextInput style={styles.input}
                    placeholder={'Re-password'}
                    secureTextEntry={true}
                    placeholderTextColor={'#7a7a7a'}
                    underlineColorAndroid='transparent'
                    onChangeText={repass => this.setState({ repass })}
                    />
                    <TouchableOpacity style={styles.btnEye}>
                        <Icon name='eye-outline'size={26} color={'rgba(0,0,0,0.8)'}  />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity  onPress={()=>navigation.navigate('dangky')}>
                    <Text style={{color:'white',fontSize:15,fontWeight:'bold',marginTop:20,}}>Da có tài khoản? Đăng nhap ngay!</Text>
                </TouchableOpacity>
            </View>

            <View style={{justifyContent:'flex-end',flex:1,padding:10}}>
                <TouchableOpacity style={styles.btnLogin} onPress={this.handleSignUp}>
                     <Text style={styles.text}>Đăng ky</Text>
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
        width:WIDTH -105,
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
        position:'absolute',
        top:8,
        right:37,
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

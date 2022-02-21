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
    Pressable
} from 'react-native';
import COLORS from './colors';

const {width:WIDTH} =Dimensions.get('window')
const SignUpScreen =({navigation})=>{
    return(
        <ImageBackground  style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
            <Image source={{uri:'https://s120-ava-talk.zadn.vn/2/1/8/b/11/120/b4db13c33fef6bf9b3eeeba9c0bfecfa.jpg'}}  style={styles.logo}/>
            <Text style={styles.logoText}> Tạo tài khoản</Text>
            </View>
            <View style={styles.inputContainer}>
                
                <TextInput style={styles.input}
                  placeholder={'Username'}
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>
            <View style={styles.inputContainer}>
                
                <TextInput style={styles.input}
                  placeholder={'Password'}
                  secureTextEntry={true}
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
                
            </View>
            <View style={styles.inputContainer}>
                
                <TextInput style={styles.input}
                  placeholder={'Email'}
                  
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
                
            </View>
            <View style={styles.inputContainer}>
                
                <TextInput style={styles.input}
                  placeholder={'SĐT'}
                  
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
                
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={()=>navigation.navigate('LoginScreen')}>
                <Text style={styles.text}>Tạo tài khoản</Text>
            </TouchableOpacity>
            <Text style={styles.or}>Hoặc</Text>
                <TouchableOpacity style={styles.btnLogin} onPress={()=>navigation.navigate('LoginScreen')}>
                     <Text style={styles.text}>Đăng Nhập</Text>
                </TouchableOpacity>
                
                
           
            
        </ImageBackground>
    );
};

const styles= StyleSheet.create({
    backgroundContainer:{
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        width:180,
        height:140,
    },
    logoContainer:{
        alignItems:'center',
        marginBottom:50,
    },
    logoText:{
        color:COLORS.dark,
        fontSize:20,
        fontWeight:'500',
        marginTop:10,
        opacity:0.5,
    },
    input:{
        width:WIDTH -55,
        height:45,
        borderRadius:25,
        fontSize:16,
        paddingLeft:45,
        backgroundColor:'rgba(0,0,0,0.35)',
        marginHorizontal:25
    },
    inputIcon:{
        position:'absolute',
        top:8,
        left:37,
    },
    inputContainer:{
        marginTop:10,
    },
    btnEye:{
        position:'absolute',
        top:8,
        right:37,
    },
    or:{
        top:10,
        color:'black',
        fontSize:16,
        textAlign:'center',

    },
    btnLogin:{
        width:WIDTH -55,
        height:45,
        borderRadius:25,
        backgroundColor:COLORS.br1,
        justifyContent:'center',
        marginTop:20,
    },
    text:{
        color:'rgba(255,255,255,0.7)',
        fontSize:16,
        textAlign:'center',
    },
});

export default SignUpScreen;
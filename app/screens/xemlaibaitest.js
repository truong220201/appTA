import React, { useState } from 'react';
import { Dimensions,TouchableOpacity,ScrollView, Text, View,Button,StyleSheet,Alert,BackHandler,TouchableWithoutFeedback,SafeAreaView} from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import CountDown from 'react-native-countdown-component';
import RenderHtml from 'react-native-render-html';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RadioButtons,SegmentedControls } from 'react-native-radio-buttons';

const Stack = createNativeStackNavigator();

export default class xemlai extends React.Component{ 
    
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        const { route,navigation } = this.props;
        this.nvt = navigation;
        const {diem,item,itemK,ds,bailam,cauhoi,d0,d1,d2,d3,dapan} = route.params;
        console.log(bailam)
        this.kq=[];
        this.dem=0;
        this.state = {
        //
        colorBtn:'grey',
        //

        hideBack:'flex',
        hideNext:'flex',
        hideHome:'flex',
        jusHome:'flex-start',
        item:item,
        itemK:itemK,
        //
        bl:bailam,
        
        //
        itemQ:1,
        q:cauhoi[0],
        opt0:d0,
        opt1:d1,
        opt2:d2,
        opt3:d3,
        qt:cauhoi,
        //
        colorw:[],
        //
        o:[d0[0],d1[0],d2[0],d3[0]],
        da:dapan,
        dapan:dapan[0],
    };

    }
    dvt(){
        for(var n=0;n<this.state.item.length;n++){
            for(var m=0;m<this.state.item.length;m++){
                if(this.state.bl[n]==this.state.da[m]){
                    //console.log('hehe',m);
                    this.kq=[...this.kq,m];
                }else{
                    //console.log('hihi')
                }
            }
        }
                
    }
    check(inum){
        if(this.state.item.length>=inum){
            [...Array(this.state.item.length)].map((o,n) => {
                if(this.state.itemK[inum-1] == this.state.item[n]){
                    //console.log('ok ',this.state.nameqs);
                    this.setState({
                        //
                        itemQ:inum,
                        q:this.state.qt[inum-1],
                        o:[this.state.opt0[n],this.state.opt1[n],this.state.opt2[n],this.state.opt3[n]],
                        dapan:this.state.da[n],
                        //answ:[...this.state.answ[inum-1]=this.state.trueAns[inum-1]],
                        //opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],
                      })
                      //console.log(this.state.dapan);
                      //console.log('inum:',inum);
                }
            })
            this.dvt();
        }else{
            Alert.alert(
                "Thông báo",
                "Phần này chưa có đủ bài tập...",
                [
                    {
                        text: "Ok",
                        onPress: () => null,
                        style: "cancel",
                    }
                ],
            );
        }
    };
    async listenForItems(inum){
        console.log('ok ');
        [...Array(this.state.item.length)].map((o,n) => {
            if(this.state.itemK[inum-1] == this.state.item[n]){
                //console.log('ok ',this.state.nameqs);
                this.setState({
                    //
                    itemQ:inum,
                    q:this.state.qt[inum-1],
                    o:[this.state.opt0[n],this.state.opt1[n],this.state.opt2[n],this.state.opt3[n]],
                    dapan:this.state.da[n],
                    //answ:[...this.state.answ[inum-1]=this.state.trueAns[inum-1]],
                    //opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],
                  })
                  //console.log(this.state.dapan);
                  console.log('inum:',inum);
                
            }
        });
         this.dvt();
        console.log(this.state.colorw);
    }










    goto(g){
        this.setState({itemQ:this.state.itemQ=g});
        this.check(g);
    };
    goNext(g){
        
        if(g>10){
            this.setState({itemQ:this.state.itemQ=1});
            
        }else{
            this.setState({itemQ:this.state.itemQ=g});
            this.check(g);
        }
    };
    goBack(g){
        
        if(g<1){
            this.setState({itemQ:this.state.itemQ=10});
        }else{
            this.setState({itemQ:this.state.itemQ=g});
            this.check(g);
        }
    };

    qsExit = () =>
        Alert.alert(
            "Nhắc nhở",
            "Bạn muốn hủy bài kiểm tra?",
            [
                {
                    text: "Không",
                    onPress: () => null,
                    style: "cancel",
                },
                {
                    text: "Có",
                    onPress: ()=>{this.navigation.navigate('huongdan',{id:this.i,ten:this.detai})},
                    style: "cancel",
                },
            ],
            {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
                ),
            }
        );
    backAction = () => {
        //Khong ho tro tieng Viet
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
            },
            { text: "YES", onPress: ()=>{this.nvt.navigate('huongdan',{id:this.i,ten:this.detai})} }
        ]);
        return true;
    };




    //-----------

    hienthi(itemQ){
            if(this.state.itemQ == 2){
                //console.log('ok ',this.state.nameqs);
                this.setState({
                    //
                    itemQ:1,
                    q:this.state.qt[0],
                    o:[this.state.opt0[0],this.state.opt1[0],this.state.opt2[0],this.state.opt3[0]],
                    //answ:[...this.state.answ[inum-1]=this.state.trueAns[inum-1]],
                    //opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],
                  })
            }
    }
    componentDidMount(){

        this.listenForItems(1);
    }

  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { route,navigation } = this.props;
    this.nvt = navigation;
    const {diem,ds,bailam,cauhoi,d0,d1,d2,d3,dapan} = route.params;
    const i = 1;
    var l = this.state.itemQ;
    const question = {html: this.state.q,};
    //console.log('bai lam : ',bailam[l-1]);

    //console.log('lua chon : ',this.state.o[l-1]);
    //console.log('dap an : ',this.state.dapan);
    //console.log(l);
    //console.log(this.state.itemQ);
    //console.log(this.state.o)
    //console.log('danh sach: ',ds)
    //console.log(this.state.item.length);

    if(l==1){
        this.state.hideHome='none';
        this.state.hideBack='none';
        this.state.hideNext='flex';
    }else if(l==10){
        this.state.hideHome='flex';
        this.state.jusHome='flex-end';
        this.state.hideNext='none';
        this.state.hideBack='flex';
    }else{
        this.state.hideHome='none';
        this.state.hideNext='flex';
        this.state.hideBack='flex';
    }
    return (
        
        
    <SafeAreaView style={styles.container}>
        <View style={styles.vw1}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{marginLeft:10,flex:1,justifyContent:'flex-start',flexDirection:'row'}} onPress={()=>navigation.navigate('home')}>
                    <Icon name = {'arrow-back-ios'} size={20} color={'black'} style={{margin:5,}} />
                </TouchableOpacity>
            </View>
            
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection:'column'}}>
                <View style={{}}>
                    <View style={{flexDirection:'row',height:30,}}>
                        {
                            [...Array(10)].map((o,i) => {
                                if(i+1==l){
                                    return(
                                        <TouchableOpacity key={i} onPress={()=>this.goto(i+1)} style={{
                                                                                            marginLeft:5,
                                                                                            height:35,
                                                                                            width: 50,
                                                                                            alignItems:'center',
                                                                                            justifyContent:'center',}}>
                                                                                                <Icon name = {'arrow-drop-down'} size={30} color={'#1CC625'} style={{}} />
                                        </TouchableOpacity>
                                    )
                                    
                                }else{
                                    return(
                                        <TouchableOpacity key={i} onPress={()=>this.goto(i+1)} style={{
                                            margin:5,
                                            height:50,
                                            width: 50,
                                            alignItems:'center',
                                            justifyContent:'center',}}>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                            )
                        }
                    </View>
                    <View style={{flexDirection:'row'}}>
                    {
                        [...Array(10)].map((o,n) => {
                            
                            if(bailam[n]!=0){
                                if(bailam[n]==this.state.da[this.kq[this.dem]]){
                                    this.dem++;
                                    return(
                                        <TouchableOpacity key={n} onPress={()=>this.goto(n+1)} style={{borderWidth:2,
                                                                                            margin:5,
                                                                                            height:50,
                                                                                            width: 50,
                                                                                            borderRadius:30,
                                                                                            borderColor:'#1CC625',
                                                                                            alignItems:'center',
                                                                                            justifyContent:'center',}}>
                                                                                            <Text style={{color:'#1CC625'}}>{n+1}</Text>
                                        </TouchableOpacity>
                                    )
                                }else{
                                    return(
                                        <TouchableOpacity key={n} onPress={()=>this.goto(n+1)} style={{borderWidth:2,
                                                                                            margin:5,
                                                                                            height:50,
                                                                                            width: 50,
                                                                                            borderRadius:30,
                                                                                            borderColor:'#e74235',
                                                                                            alignItems:'center',
                                                                                            justifyContent:'center',}}>
                                                                                            <Text style={{color:'#e74235'}}>{n+1}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            }else{
                                return(
                                    <TouchableOpacity key={n} onPress={()=>this.goto(n+1)} style={{borderWidth:2,
                                                                                        margin:5,
                                                                                        height:50,
                                                                                        width: 50,
                                                                                        borderRadius:30,
                                                                                        borderColor:'grey',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'center',}}>
                                                                                        <Text style={{color:this.state.colorBtn}}>{n+1}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                        )
                }
                </View>
            </View>
                    
            </ScrollView>
        </View>
        <View style={{flex:5,}}>
        <ScrollView style={{width:windowWidth,}} showsScrollIndicator={false}>
            <View style={styles.vw2}>   
                <Text style={styles.txtLevel}>Câu {this.state.itemQ}</Text>
                <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={question} />
            </View>
           
            <View style={{margin: 20}}>



            <RadioButtons
                options={ this.state.o }
                renderOption={ 
                    (option, selected, onSelect, index)=>{
                        /*const s = selected ? { borderWidth:2,
                                                borderColor:'#1CC625',
                                                borderRadius:7,
                                                padding:15,
                                                flexDirection:'row',
                                                marginBottom:'6%',} : { borderWidth:2,
                                                    borderColor:'#f0f0f0',
                                                    borderRadius:7,
                                                    padding:15,
                                                    flexDirection:'row',
                                                    marginBottom:'6%',};
                                                    */
                        const windowWidth = Dimensions.get('window').width;
                        //console.log("num: ",this.state.itemQ);
                        //console.log("num: ",this.state.answ[this.state.itemQ-1]);
                        if(option==bailam[l-1]){
                            console.log("helloooooooo");

                            if(option==this.state.dapan){
                                return (
                                    <TouchableOpacity  key={index} style={{borderWidth:2,
                                                                                            borderColor:'#1CC625',
                                                                                            borderRadius:7,
                                                                                            padding:15,
                                                                                            flexDirection:'row',
                                                                                            marginBottom:'6%'}}>
                                        <Text style={styles.abcd}></Text>
                                        <View style={{top:5,}}>
                                            <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={{html:option}} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            }else{
                                return (
                                    <TouchableOpacity  key={index} style={{borderWidth:2,
                                                                                            borderColor:'red',
                                                                                            borderRadius:7,
                                                                                            padding:15,
                                                                                            flexDirection:'row',
                                                                                            marginBottom:'6%'}}>
                                        <Text style={styles.abcd}></Text>
                                        <View style={{top:5,}}>
                                            <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={{html:option}} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            }

                        }else{
                            if(option==this.state.dapan){
                                return (
                                    <TouchableOpacity  key={index} style={{borderWidth:2,
                                                                                            borderColor:'#1CC625',
                                                                                            borderRadius:7,
                                                                                            padding:15,
                                                                                            flexDirection:'row',
                                                                                            marginBottom:'6%'}}>
                                        <Text style={styles.abcd}></Text>
                                        <View style={{top:5,}}>
                                            <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={{html:option}} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            }else{
                                return (
                                    <TouchableOpacity  key={index} style={{borderWidth:2,
                                                                                            borderColor:'#f0f0f0',
                                                                                            borderRadius:7,
                                                                                            padding:15,
                                                                                            flexDirection:'row',
                                                                                            marginBottom:'6%'}}>
                                        <Text style={styles.abcd}></Text>
                                        <View style={{top:5,}}>
                                            <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={{html:option}} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            }
                        }
                        
                        }
                 }
                index={9}
                renderContainer={ this.renderContainer }
            />
            


            </View>
            <View style={styles.vw4}>
                <TouchableOpacity  onPress={()=>this.goBack(this.state.itemQ-1)} style={{display:this.state.hideBack,
                                                                                        flexDirection:'row',
                                                                                        height:'58%',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'center',
                                                                                        flex:1,
                                                                                        justifyContent:'flex-start',}}>
                    <View style={styles.btnNext}>
                        <Icon name = {'arrow-back-ios'} size={20} color={'#53ad71'} style={{margin:5,}} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>navigation.navigate('home')} style={{display:this.state.hideHome,
                                                                                        flexDirection:'row',
                                                                                        height:'58%',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'center',
                                                                                        flex:1,
                                                                                        justifyContent:this.state.jusHome}}>
                    <View style={styles.btnNext}>
                        <Icon name = {'home'} size={30} color={'#53ad71'} style={{margin:5,}} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>this.goNext(this.state.itemQ+1)} style={{display:this.state.hideNext,
                                                                                        flexDirection:'row',
                                                                                        height:'58%',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'center',
                                                                                        flex:1,
                                                                                        justifyContent:'flex-end',
                                                                                    }}>
                    <View style={styles.btnNext}>
                        <Icon name = {'arrow-forward-ios'} size={20} color={'#53ad71'} style={{margin:5,}} />
                    </View>
                </TouchableOpacity>
                
            </View>
        </ScrollView>
        </View>
    </SafeAreaView>
)
}


};


const html = StyleSheet.create({
    span:{
    }
})
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
        alignItems:'center',
        width:'100%',
        height:20,
        borderBottomWidth:1,
        borderBottomColor:'#b5b5b5',
        marginTop:20,
        flex:1,
        paddingBottom:10,
    },
    vw1a:{
    },
    
    vw2:{
        width:'100%',
        flex:2,
        padding:10,
        justifyContent:'center',
    },
    vw3:{
        width:'100%',
        flex:10,
        padding:10,
    },
    vw4:{
        width:'100%',
        flex:2,
        flexDirection:'row',
        alignItems:'center',
        padding:10,

    },
    contentView:{
        borderWidth:2,
        borderColor:'#f0f0f0',
        borderRadius:7,
        padding:15,
        flexDirection:'row',
        marginBottom:'6%',
    },
    
    txtLevel:{
        color:'#858585',
        fontSize:20,
        marginBottom:'5%',
        flexDirection:'row',
    },
    txtQuestion:{
        
    },
    abcd:{
        color:'#1CC625',
        fontSize:20,
        marginRight:8,
    },
    txtAnswer:{
        marginLeft:5,
        color:'#575757',
        fontSize:20,
    },
    viewBtnNext:{
        flexDirection:'row',
        height:'58%',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        justifyContent:'flex-end',
    },
    viewBtnPrev:{
        flexDirection:'row',
        height:'58%',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        justifyContent:'flex-start',
        
    },
    txtNext:{
        color:'#b5b5b5',
        fontSize:18,
    },
    btnCList:{
        borderWidth:2,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        borderColor:'#1CC625',
        alignItems:'center',
        justifyContent:'center',
    },
    btnList:{
        borderWidth:2,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        borderColor:'grey',
        alignItems:'center',
        justifyContent:'center',
    },
    btnNext:{
        borderWidth:2,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        borderColor:'#1CC625',
        alignItems:'center',
        justifyContent:'center',
    },
    btnPrev:{
        borderWidth:2,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        borderColor:'#1CC625',
        alignItems:'center',
        justifyContent:'center',
    },
    btnNopbai:{
        backgroundColor:'#fff',
        borderRadius:5,
        width: 100,
        height:35,
        alignItems:'center',
        justifyContent:'center',
        elevation:2,
        borderWidth:1,
        borderColor:'#1CC625'
      },
    
  });

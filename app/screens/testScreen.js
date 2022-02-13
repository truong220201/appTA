import React, { useState } from 'react';
import { Dimensions,TouchableOpacity,ScrollView, Text, View,Button,StyleSheet,Alert,BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import CountDown from 'react-native-countdown-component';
import RenderHtml from 'react-native-render-html';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default class testScreen extends React.Component{ 
    
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        const { route,navigation } = this.props;
        this.nvt = navigation;
        const { baitap,name,n,ten} = route.params;
        //console.log(baitap)
        this.i = baitap;
        this.detai= ten;
        this.num = n;
        this.state = {
            hideBack:'flex',
            hideNext:'flex',
            timer:500,
            keys:[],
            item:[],
            itemQ:1,
            opt0:[],
            opt1:[],
            opt2:[],
            opt3:[],
            itemK:[],
            nameqs:[],
            leng:0,
            //test
            q:'',
            a1:'',
            a2:'',
            a3:'',
            a4:'',
            };
      }
      //Thay doi cau hoi/ tra loi
      check(inum){
        [...Array(this.state.item.length)].map((o,n) => {
        if(this.state.itemK[inum-1] == this.state.item[n]){
            //console.log('ok ');
            this.setState({
                //item:this.state.item.push(data)
                //item:Object.keys(`${doc.data().Title}`)
                //itemK:[...this.state.itemK,`${doc.data().True_ans}`],
                itemQ:inum,
                q:this.state.nameqs[inum-1],
                a1:this.state.opt0[inum-1],
                a2:this.state.opt1[inum-1],
                a3:this.state.opt2[inum-1],
                a4:this.state.opt3[inum-1],
                //opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],

              })
              console.log('check function');
              console.log('inum:',inum);
              console.log('lengqs: ',this.state.nameqs.length);
        }
        })
    };
    reset(){    
        this.setState ({
            item:[],
            opt0:[],
            opt1:[],
            opt2:[],
            opt3:[],
            itemK:[],
            nameqs:[],
            });
    };
      async listenForItems(inum){
        
        const db = getFirestore(firebaseApp);
        //console.log(db);
        //const docRef = doc(db, "Quiz", "03ZnOo7bgWhJvJU9Th9G");
        //const docSnap = await getDoc(docRef);
        const querySnapshot = await getDocs(collection(db, "Option"));
        const querySnapshotQS = await getDocs(collection(db, "Question"));
        querySnapshotQS.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data().id_Category}`);
            if(this.i == `${doc.data().id_Category}`){
                //console.log('ok');
                this.setState({
                    itemK:[...this.state.itemK,`${doc.id}`],
                    nameqs:[...this.state.nameqs,`${doc.data().name_Question}`], 
                })
                console.log('length item k: ',this.state.itemK.length);
            }
        }),
        
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data().id_Question}`);
          //console.log(`${doc.data().Option_ans[0]}`);
          //console.log(`length: ${doc.id.length}`);
          
         //console.log(this.i);
         console.log(this.state.item.length)
         //console.log(this.state.itemK);
         
         this.setState({
            //item:this.state.item.push(data)
            //item:Object.keys(`${doc.data().Title}`)
            item:[...this.state.item,`${doc.data().id_Question}`],
            nameqs:[...this.state.nameqs,1],
            opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],
            opt1:[...this.state.opt1,`${doc.data().Option_ans[1]}`],
            opt2:[...this.state.opt2,`${doc.data().Option_ans[2]}`],
            opt3:[...this.state.opt3,`${doc.data().Option_ans[3]}`],
        });
        //console.log(`${doc.data().id_Question}`);
        //console.log(this.state.itemK[this.num])
        //console.log('stop');

        //Dat gia tri cho phan tu thu nhat
        if(this.state.itemK[0] == this.state.item[this.state.item.length-1]){
            //console.log('ok ');
            this.setState({
                //item:this.state.item.push(data)
                //item:Object.keys(`${doc.data().Title}`)

                //re-render khi su dung shouldComponentUpdate
                itemK:[...this.state.itemK,1],

                //
                itemQ:inum,
                q:this.state.nameqs[inum-1],
                a1:this.state.opt0[inum-1],
                a2:this.state.opt1[inum-1],
                a3:this.state.opt2[inum-1],
                a4:this.state.opt3[inum-1],
                
                //opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],
              })
              console.log('helloc');
              console.log('inum:',inum);
              //console.log(this.state.a1);

        }

        }); 
        //console.log('item:'+this.state.item);
        //console.log('length:'+this.state.leng);
    }
    goto(g){
        this.check(g);
        this.listenForItems(g);
        this.reset();
    };
    goNext(g){
        
        if(g>10){
            this.listenForItems(1);
            this.reset();
            
        }else{
            this.check(g);
            this.listenForItems(g);
            this.reset();
        }
    };
    goBack(g){
        
        if(g<1){
            this.listenForItems(10)
            this.reset();
        }else{
            this.check(g);
            this.listenForItems(g);
            this.reset();

        }
    };

    qsExit = () =>
        Alert.alert(
            "Nhắc nhở",
            "Bạn có muốn thoát?",
            [
                {
                    text: "Không",
                    onPress: () => null,
                    style: "cancel",
                },
                {
                    text: "Có",
                    onPress: ()=>{this.nvt.navigate('huongdan',{id:this.i,ten:this.detai})},
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





    componentDidMount(){

        this.listenForItems(this.num);
        //Timer
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
          );
        //BackHandler
        this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
        );
    }
    componentDidUpdate(){
        if(this.state.timer === 1){ 
          clearInterval(this.interval);
        }
    }
    //tranh render lai khong can thiet
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.itemK !== nextState.itemK) {
          return true;
        }
        return false;
    }
    componentWillUnmount(){
        clearInterval(this.interval);

        this.backHandler.remove();
    }
    
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { route,navigation } = this.props;
    const { baitap,name} = route.params;
    const i = baitap;
    var l = this.state.itemQ;
    const question = {html: this.state.q,};
    const da1 = {html: this.state.a1,};
    const da2 = {html: this.state.a2,};
    const da3 = {html: this.state.a3,};
    const da4 = {html: this.state.a4,};
    console.log(l);

    if(l==1){
        this.state.hideBack='none';
    }else if(l==10){
        this.state.hideNext='none';
    }else{
        this.state.hideNext='flex';
        this.state.hideBack='flex';
    }
    return (
        
        
    <View style={styles.container}>
        <View style={styles.vw1}>

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{marginLeft:10,flex:1,justifyContent:'flex-start',flexDirection:'row'}} onPress={()=>this.qsExit()}>
                    <Icon name = {'arrow-back-ios'} size={20} color={'black'} style={{margin:5,}} />
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',flex:1,}}>
                    <CountDown
                        size={17}
                        until={45*60} 
                        onFinish={() => alert('Hết giờ!')}
                        digitStyle={{backgroundColor: '#FFF',}}
                        digitTxtStyle={{color: '#53ad71'}}
                        timeLabelStyle={{color: 'red'}}
                        separatorStyle={{color: '#53ad71'}}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: null, s: null}}
                        showSeparator
                        />
                    <Icon name = {'alarm'} size={20} color={'#1CC625'} style={{margin:5,}} />
                </View>
                <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row',paddingRight:5,}}>
                    <TouchableOpacity style={styles.btnNopbai}>
                        <Text style={{color:'#1CC625',fontSize:15,}}>Nộp bài</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} >
                {
                            
                    [...Array(10)].map((o,n) => {
                        if(n+1==l){
                            return(
                                <TouchableOpacity key={this.baitap} onPress={()=>null} style={styles.btnCList}>
                                    <Text style={{color:'#1CC625'}}>{n+1}</Text>
                                </TouchableOpacity>
                            )
                        }else{
                            return(
                                <TouchableOpacity key={this.baitap} onPress={()=>this.goto(n+1)} style={styles.btnList}>
                                    <Text style={{color:'grey'}}>{n+1}</Text>
                                </TouchableOpacity>
                            )
                        }
                    }
                    )
                }
            </ScrollView>
        </View>
        <View style={{flex:6,}}>
        <ScrollView style={{width:windowWidth,}} showsScrollIndicator={false}>
            <View style={styles.vw2}>   
                <Text style={styles.txtLevel}>Câu {this.state.itemQ}</Text>
                <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={question} />
            </View>
            <View style={styles.vw3}>
                <TouchableOpacity  style={styles.contentView}>
                    <Text style={styles.abcd}>A.</Text>
                    <View style={{top:5,}}>
                        <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={da1} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentView}>
                    <Text style={styles.abcd}>B.</Text>
                    <View style={{top:5,}}>
                        <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={da2} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentView}>
                    <Text style={styles.abcd}>C.</Text>
                    <View style={{top:5,}}>
                        <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={da3} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentView}>
                    <Text style={styles.abcd}>D.</Text>
                    <View style={{top:5,}}>
                        <RenderHtml enableExperimentalMarginCollapsing = { true } contentWidth={windowWidth} source={da4} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.vw4}>
                <TouchableOpacity  onPress={()=>this.goBack(this.state.itemQ-1)} style={{
                                                                                        display:this.state.hideBack,
                                                                                        flexDirection:'row',
                                                                                        height:'58%',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'center',
                                                                                        flex:1,
                                                                                        justifyContent:'flex-start',}}>
                    <View style={styles.btnNext}>
                        <Icon name = {'arrow-back-ios'} size={20} color={'#53ad71'} style={{margin:5,}} />
                    </View>
                    <Text style={styles.txtNext}>Câu trước đó</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>this.goNext(this.state.itemQ+1)} style={{
                                                                                        display:this.state.hideNext,
                                                                                        flexDirection:'row',
                                                                                        height:'58%',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'center',
                                                                                        flex:1,
                                                                                        justifyContent:'flex-end',
                                                                                    }}>
                    <Text style={styles.txtNext}>Câu kế tiếp</Text>
                    <View style={styles.btnNext}>
                        <Icon name = {'arrow-forward-ios'} size={20} color={'#53ad71'} style={{margin:5,}} />
                    </View>
                </TouchableOpacity>
                
            </View>
        </ScrollView>
        </View>
    </View>
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
        padding:5,

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

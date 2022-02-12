import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import HTMLView from 'react-native-htmlview';
import CountDown from 'react-native-countdown-component';
import RenderHtml from 'react-native-render-html';

export default class testScreen extends React.Component{ 
    
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        const { route,navigation } = this.props;
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
                //console.log(this.state.itemK);
            }
        }),

        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data().id_Question}`);
          //console.log(`${doc.data().Option_ans[0]}`);
          //console.log(`length: ${doc.id.length}`);
          
         //console.log(this.i);
         //console.log(this.state.item)
         //console.log(this.state.itemK);
         this.setState({
            //item:this.state.item.push(data)
            //item:Object.keys(`${doc.data().Title}`)
            //item:[...this.state.item,`${doc.data().Option_ans[0]}`],
            //opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],
            
        });
        //console.log(`${doc.data().id_Question}`);
        //console.log(this.state.itemK[this.num])
        if(this.state.itemK[inum-1] ==`${doc.data().id_Question}`){
            //console.log('ok ');
            this.setState({
                //item:this.state.item.push(data)
                //item:Object.keys(`${doc.data().Title}`)
                //itemK:[...this.state.itemK,`${doc.data().True_ans}`],
                itemQ:inum,
                q:this.state.nameqs[inum-1],
                a1:`${doc.data().Option_ans[0]}`,
                a2:`${doc.data().Option_ans[1]}`,
                a3:`${doc.data().Option_ans[2]}`,
                a4:`${doc.data().Option_ans[3]}`,
                //opt0:[...this.state.opt0,`${doc.data().Option_ans[0]}`],

              })
              console.log('hellob');
              console.log('inum:',inum);
        }
            
          
        
        });
        //console.log('item:'+this.state.item);
        //console.log('length:'+this.state.leng);
    }
    static navigationOptions = {
        title : 'ok',
        headerStyle:{
            backgroundColor:'red',
        },
        headerRight:(   
            <TouchableOpacity><Text>info</Text></TouchableOpacity>
        )

    };
    goNext(g){
        if(g>10){
            this.listenForItems(1)
        }else{
            this.listenForItems(g)
        }
    };
    goBack(g){
        if(g<1){
            this.listenForItems(10)
        }else{
            this.listenForItems(g)
        }
    };
    componentDidMount(){
        this.listenForItems(this.num);
        
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
          );
    }
    componentDidUpdate(){
        if(this.state.timer === 1){ 
          clearInterval(this.interval);
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval);
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
            <Text style={{fontWeight:'bold',}}>{this.detai}</Text>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text >Thời gian làm bài: </Text>
            <CountDown
                size={20}
                until={45*60} 
                onFinish={() => alert('Finished')}
                digitStyle={{backgroundColor: '#FFF',}}
                digitTxtStyle={{color: '#1CC625'}}
                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: '#1CC625'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                />
            </View>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} >
                {
                            
                    [...Array(10)].map((o,n) => {
                        if(n+1==l){
                            return(
                                <TouchableOpacity key={this.baitap} onPress={()=>this.listenForItems(n+1)} style={styles.btnCList}>
                                    <Text style={{color:'#53ad71'}}>{n+1}</Text>
                                </TouchableOpacity>
                            )
                        }else{
                            return(
                                <TouchableOpacity key={this.baitap} onPress={()=>this.listenForItems(n+1)} style={styles.btnList}>
                                    <Text style={{color:'grey'}}>{n+1}</Text>
                                </TouchableOpacity>
                            )
                        }
                    }
                    )
                }
            </ScrollView>
        </View>
        <View style={{flex:4,}}>
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
        color:'#4c93f9',
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
        borderColor:'#53ad71',
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
        borderColor:'#53ad71',
        alignItems:'center',
        justifyContent:'center',
    },
    btnPrev:{
        borderWidth:2,
        margin:5,
        height:50,
        width: 50,
        borderRadius:30,
        borderColor:'#53ad71',
        alignItems:'center',
        justifyContent:'center',
    },

    
  });

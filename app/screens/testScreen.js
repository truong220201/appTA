import React, { useState } from 'react';
import { Dimensions,Animated,TouchableOpacity,TouchableHighlight,ScrollView, Text, View,Button,StyleSheet,Image,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import HTMLView from 'react-native-htmlview';

export default class testScreen extends React.Component{ 
    
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        const { route,navigation } = this.props;
        const { baitap,name,n} = route.params;
        //console.log(baitap)
        this.i = baitap;
        this.num = n;
        this.state = {
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
    goto(g){
        if(g>10){
            this.listenForItems(1)
        }else{
            this.listenForItems(g)
        }
    };
  render(){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { route,navigation } = this.props;
    const { baitap,name} = route.params;
    const i = baitap;
    var l = this.state.itemQ;
    console.log(l);
    
    return (
        
    <View style={styles.container}>
        
        <View style={styles.vw1}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
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
        <View style={styles.vw2}>   
            <Text style={styles.txtLevel}>Câu {this.state.itemQ}</Text>
            <HTMLView  style={styles.txtQuestion} value={this.state.q}/>
        </View>
        <View style={styles.vw3}>
            <TouchableOpacity  style={styles.contentView}>
                <Text style={styles.abcd}>A.</Text>
                <HTMLView style={styles.txtAnswer} value={this.state.a1}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentView}>
                <Text style={styles.abcd}>B.</Text>
                <HTMLView style={styles.txtAnswer} value={this.state.a2}/> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentView}>
                <Text style={styles.abcd}>C.</Text>
                <HTMLView style={styles.txtAnswer} value={this.state.a3}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentView}>
                <Text style={styles.abcd}>D.</Text>
                <HTMLView style={styles.txtAnswer} value={this.state.a4}/>
            </TouchableOpacity>
        </View>
        <View style={styles.vw4}>
            <TouchableOpacity  onPress={()=>this.goto(this.state.itemQ+1)} style={styles.viewBtnNext}>
                <Text style={styles.txtNext}>Câu kế tiếp</Text>
                <View style={styles.btnNext}>
                    <Icon name = {'arrow-forward-ios'} size={20} color={'#53ad71'} style={{margin:5,}} />
                </View>
            </TouchableOpacity>
        </View>
    </View>
)
}

componentDidMount(){
    this.listenForItems(this.num);
}
};



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
        width:'100%',
        flex:2,
        borderBottomWidth:1,
        borderBottomColor:'#b5b5b5',
        flexDirection:'row',
    },
    vw2:{
        width:'100%',
        flex:2,
        padding:10,
        justifyContent:'center'
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
        justifyContent:'flex-end'

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
    },
    txtQuestionA:{
        color:'#303030',
        fontSize:17,
    },
    abcd:{
        color:'#4c93f9',
        fontSize:20,
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

    
  });

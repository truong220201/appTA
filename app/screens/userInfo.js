import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../components/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 


class ProfileScreen extends React.Component{
    constructor(props) {
        super(props);
        //this.itemRef = getDatabase(firebaseApp);
        //console.log(this.itemRef);
        const { route,navigation } = this.props;
        const { uid} = route.params;
        console.log(uid)
        this.uid=uid;
        this.email='';
        this.diemtl=0;
      }

      async listenForItems(itemRef){
        const db = getFirestore(firebaseApp);
        //console.log(db);
        //const docRef = doc(db, "Quiz", "03ZnOo7bgWhJvJU9Th9G");
        //const docSnap = await getDoc(docRef);
        const querySnapshot = await getDocs(collection(db, "User"));
        querySnapshot.forEach((doc) => {
            if(`${doc.data().Uid}`==this.uid){
                this.email=`${doc.data().Email}`
                this.diemtl=`${doc.data().Diem}`
            }   
        });
        //console.log('phan tu dau tien : ',this.state.keys[1]);
        //console.log('item:',this.email);
        //console.log('length:'+this.state.leng);
    }

    render(){
       

            this.listenForItems()
            const emaila=this.email;
            const diemtla=this.diemtl;
            console.log('k;',this.email)
            const { navigation } = this.props;
        
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{uri:'https://st.quantrimang.com/photos/image/2021/03/09/Hinh-nen-bo-sua-3.jpg'}}
        />
        <Text style={styles.userName}>Email: {emaila}</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>
       Your Score : {diemtla}
        </Text>
        <View style={styles.userBtnWrapper}>
          
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
        </View>

       

     
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity  style={styles.c4} onPress={()=>navigation.navigate('home')}>
            <Icon style = {{}} name="home" size={25} color="grey"
            />
        </TouchableOpacity>
        <TouchableOpacity  style={styles.c4} onPress={()=>navigation.navigate('ps', {loaiId: 8})}>
            <Icon style = {{}} name="person" size={25} color="#6bdb91"
            />
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};
}

export default ProfileScreen;

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
    padding: 100,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

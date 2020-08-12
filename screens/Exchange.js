import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class Exchange extends Component {

  constructor(){
    super()
    this.state = {
      userName : firebase.auth().currentUser.email,
      itemName : "",
      description : "",
      requestedItemName:"",
      exchangeId:"",
      itemStatus:"",
      docId: "",
      itemValue:"",
      currencyCode:""

    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  addItem= async(itemName, description)=>{

    var userName = this.state.userName
    var exchangeId = this.createUniqueId()
    console.log("im called",exchangeId);
    db.collection("exchange_requests").add({
      "username"    : userName,
      "item_name"   : itemName,
      "description" : description,
      "exchangeId"  : exchangeId,
      "item_status" : "requested",
      "item_value"  : this.state.itemValue,
        "date"       : firebase.firestore.FieldValue.serverTimestamp()

     })

     
     
     this.setState({
       itemName : '',
       description :'',
       itemValue : ""
     })



      return this.props.navigation.navigate('HomeScreen')

  }


  getIsExchangeRequestActive(){
    db.collection('users')
    .where('username','==',this.state.userName)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState({
          IsExchangeRequestActive:doc.data().IsExchangeRequestActive,
          userDocId : doc.id,
        })
      })
    })
  }

  


  componentDidMount(){
/*    this.getIsExchangeRequestActive()
*/  
}


  receivedItem=(itemName)=>{
    var userId = this.state.userName
    var exchangeId = this.state.exchangeId
    db.collection('received_items').add({
        "user_id": userId,
        "item_name":itemName,
        "exchange_id"  : exchangeId,
        "itemStatus"  : "received",

    })
  }

  updateExchangeRequestStatus=()=>{
    //updating the book status after receiving the book
    db.collection('requested_requests').doc(this.state.docId)
    .update({
      item_status : 'recieved'
    })

    //getting the  doc id to update the users doc
    db.collection('users').where('username','==',this.state.userName).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        //updating the doc
        db.collection('users').doc(doc.id).update({
          IsExchangeRequestActive: false
        })
      })
    })

}
  

  render()
  {
    if (this.state.IsExchangeRequestActive === true){
      // status screen
      return(
        <View style = {{flex:1,justifyContent:'center'}}>
         <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
         <Text>Item Name</Text>
         <Text>{this.state.requestedItemName}</Text>
         </View>
         <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
         <Text> Item Value </Text>

         <Text>{this.state.itemValue}</Text>
         </View>
         <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
         <Text> Item Status </Text>

         <Text>{this.state.itemStatus}</Text>
         </View>

         <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
         onPress={()=>{
           this.updateExchangeRequestStatus();
           this.receivedItem(this.state.requestedItemName)
         }}>
         <Text>I recieved the Item </Text>
         </TouchableOpacity>
       </View>
     )

    }
    else {
      return(
        <View style={{flex:1}}>
        <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text style={{textDecorationColor: "blue", alignText:"center"}}> Hello, before reporting we want to tell u that please write real cases where u were bullied. If a report is found out false, strict action can be taken against the complaint launcher. Once u launch a complain, other people who will use this app can see your complaints. We hope that your complain would be checked upon soon. If u want to log out drag from the left. You can choose your profile picture from there and can also log out.</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Your home address"}
            maxLength ={80}
            onChangeText={(text)=>{
              this.setState({
                itemName: text
              })
            }}
            value={this.state.itemName}
          />
          <TextInput
            multiline
            numberOfLines={15}
            style={[styles.formTextInput,{height:100}]}
            placeholder ={"Your name and What happened wrong with u?"}
            onChangeText={(text)=>{
              this.setState({
                description: text
              })
            }}
            value={this.state.description}

          />
          
          <TouchableOpacity
            style={[styles.button,{marginTop:10}]}
            onPress = {()=>{this.addItem(this.state.itemName, this.state.description)}}
            >
            <Text style={{color:'#ffff', fontSize:18, fontWeight:'bold'}}>Add Item</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

})
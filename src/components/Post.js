import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import {auth} from '../firebase/config'
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase'


export default class Post extends Component {
    constructor(){
        super()
        this.state={
        }
    }

    componentDidMount () {
        auth.onAuthStateChanged(user=>{
            if(this.props.data.likes.includes(auth.currentUser.email)){
                this.setState({
                })
            }
        })
    }

  render() {
    return (
        <View style={styles.listItem}>
            <Text>{this.props.data.mensaje}</Text>
            <Text>Publicado por: {this.props.data.email}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    listItem: {
        fontSize: 15,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
})

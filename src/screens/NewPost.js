import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {auth, db} from '../firebase/config'

export default class NewPost extends Component {
    constructor(){
        super()
        this.state = {
            post:[],
            error: '',
            mensaje: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
          if (!user){
            this.props.navigation.navigate('Login')
          }
        })
      }

    handlePost(){
    db.collection('posts').add({
        email: auth.currentUser.email,
        mensaje: this.state.mensaje,
        createdAt: Date.now(),
        likes: []
    })
    .then(()=> {
        this.props.navigation.navigate('Home')
    })
    .catch(error => {
        if (this.state.errorMessage != '') {
        alert(this.state.errorMessage);
        }
    })
    }

  render() {
    return (
        <View style={styles.mainContainer}>
        <Text style={styles.title}> Posteo</Text>
        <TextInput style={styles.input} 
        placeholder='Posteo'
        onChangeText={text => this.setState({ mensaje: text })}
          value={this.state.mensaje}
        />
        <TouchableOpacity style={styles.button} onPress={()=> this.handlePost(this.state.mensaje)}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '60%',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
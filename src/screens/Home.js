import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';



export default class Home extends Component {
  saludar() {
    console.log('Me clickearon')
  }

  handleLogOut = () => {
    auth.signOut()
      .then(this.props.navigation.navigate('Login'))
  }

  render() {
    return (
      <View>
        <Text style={styles.second}>
          Estás en la home
        </Text>

        {/* Pongo esto para salir y volver a entrar, hasta que ande el "remember me" */}
        <TouchableOpacity style={styles.button} onPress={() => this.handleLogOut()}>
          <Text style={styles.buttonText}>Desloguearse</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  second: {
    flex: 2,
    fontSize: 15,
    padding: 20,
  }
});
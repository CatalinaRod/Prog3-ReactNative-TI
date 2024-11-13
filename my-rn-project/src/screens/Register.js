import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class Register extends Component {
  render() {
    return (
        <View>
            <Text style={styles.title}>Formulario de Register</Text>

            {/* Esto despues lo borramos, Yo lo hice para poder hacer HomeMenu sin crear usuario */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeMenu")}>
                <Text style={styles.second}>
                    Entrar en la app
                </Text>
            </TouchableOpacity>

        </View>
    )
  }
}

const styles = StyleSheet.create({

    title: {
        flex: 1,
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
    },

    second: {
        flex: 2,
        fontSize: 15,
        padding:20,
    },

})
import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'


export default class Home extends Component {
    saludar() {
        console.log('Me clickearon')
    }
  render() {
    return (
      <View>
        <Text style={styles.second}>
            Estás en la home                
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

    second: {
        flex: 2,
        fontSize: 15,
        padding:20,
    },

})
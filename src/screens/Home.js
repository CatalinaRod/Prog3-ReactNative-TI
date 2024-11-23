import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';


export default class Home extends Component {
  
  constructor(){
    super()
    this.state={
        posts:[],
        loading:'true'
    }
  }

  componentDidMount(){
    db.collection('posts').onSnapshot(
        docs => {
           let post=[]
           docs.forEach(doc => { post.push({
                 id: doc.id,
                 data: doc.data()
              })
           this.setState({
              posts: post,
              loading: false
           })
           });
        }
     )
  }

  handleLogOut = () => {
    auth.signOut()
      .then(this.props.navigation.navigate('Login'))
  }

  render() {
    return (
      <View>
        <FlatList
            data={this.state.posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) =><Post data={item.data}/>}
        />
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
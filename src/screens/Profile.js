import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

import Post from '../components/Post';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      usuarioLogueado: null,

    }
  }

  componentDidMount() {
    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(
        docs => {
          let post = []
          docs.forEach(doc => {
            post.push({
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

    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {

        let usuarioLogueado = [];

        docs.forEach(doc => {
          usuarioLogueado.push({
            id: doc.id,
            data: doc.data()
          })
        });
        this.setState({
          usuarioLogueado: usuarioLogueado[0].data.userName,
        });
      })
  }

  handleLogOut() {
    auth.signOut()
      .then(this.props.navigation.navigate('Login'))
  }

  render() {

    return (
      <View>
        <Text>{this.state.usuarioLogueado}</Text>
        <Text>{auth.currentUser.email}</Text>
        <Text>Cantidad de posteos: {this.state.posts.length}</Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Post posts={item} />}
        />
        <TouchableOpacity onPress={() => this.handleLogOut()}>
          <Text>Desloguearse</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

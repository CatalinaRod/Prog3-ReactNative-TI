import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      usuarioLogueado: null,
    };
  }

  componentDidMount() {
    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let post = [];
        docs.forEach(doc => {
          post.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({
          posts: post,
        });
      });

    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let usuarioLogueado = [];
        docs.forEach(doc => {
          usuarioLogueado.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({
          usuarioLogueado: usuarioLogueado[0].data.userName,
        });
      });
  }

  handleLogOut() {
    auth.signOut().then(() => this.props.navigation.navigate('Login'));
  }

  deletePost(postId) {
    db.collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post eliminado");
        this.setState({
          posts: this.state.posts.filter(post => post.id !== postId)
        });
      })
      .catch(error => {
        console.error("Error eliminando el post:", error);
      });
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
          renderItem={({ item }) => (
            <Post
              post={item}
              deletePost={() => this.deletePost(item.id)} 
            />
          )}
        />
        <TouchableOpacity onPress={() => this.handleLogOut()}>
          <Text>Desloguearse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

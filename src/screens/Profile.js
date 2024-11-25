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
    const userEmail = auth.currentUser.email;
    
    db.collection('posts')
      .where('email', '==', userEmail)
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          const postData = doc.data();
          posts.push({
            id: doc.id,
            data: postData,
          });
        });
        this.setState({ posts });
      });

    db.collection('users')
      .where('email', '==', userEmail)
      .onSnapshot(docs => {
        let usuarioLogueado = null;
        docs.forEach(doc => {
          const userData = doc.data();
          if (userData) {
            usuarioLogueado = userData.userName;
          }
        });
        this.setState({ usuarioLogueado: usuarioLogueado || 'Usuario' });
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
      <View style={styles.container}>
        <Text style={styles.userName}>{this.state.usuarioLogueado}</Text>
        <Text style={styles.text}>{auth.currentUser.email}</Text>
        <Text style={styles.text}>Cantidad de posteos: {this.state.posts.length}</Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            item.data ? (
              <Post style={styles.postContainer}
                posts={item}
                deletePost={() => this.deletePost(item.id)} 
              />
            ) : null 
          )}
        />
        <TouchableOpacity onPress={() => this.handleLogOut()} style={styles.button}>
          <Text style={styles.buttonText}>Desloguearse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f8ff', 
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center'
    },
    button: {
      paddingVertical: 12,
      backgroundColor: '#71a5de', 
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      width: '60%',
      alignSelf: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#ffffff', 
      fontWeight: '600',
      fontSize: 16,
      textAlign: 'center',
    }
  });
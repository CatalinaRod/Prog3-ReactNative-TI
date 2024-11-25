import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';


export default class Home extends Component {

  constructor() {
    super()
    this.state = {
      posts: [],
      loading: 'true'
    }
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(
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
  }


  render() {
    return (
      <View>
        <FlatList
          data={this.state.posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Post posts={item} />}
        />
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
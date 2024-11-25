import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config'
import firebase from "firebase";

// Iconos para los likes
import AntDesign from '@expo/vector-icons/AntDesign';


export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            cantLikes: this.props.posts.data.likes ? this.props.posts.data.likes.length : 0,
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (this.props.posts.data.likes.includes(auth.currentUser.email)) {
                this.setState({
                    liked: true,
                })
            } else {
                this.setState({
                    liked: false,
                })
            }
        })
    }

    handleLike() {
        let postId = db.collection("posts").doc(this.props.posts.id);

        if (this.state.liked) {
            postId.update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
            })
                .then(() => {
                    this.setState({
                        liked: false,
                        cantLikes: this.state.cantLikes - 1
                    })
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            postId.update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
                .then(() => {
                    this.setState({
                        liked: true,
                        cantLikes: this.state.cantLikes + 1
                    })
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <View style={styles.contenedor}>

                {/* Usuario y contenido de la publicación*/}
                <Text style={styles.email}>{this.props.posts.data.email} </Text>
                <Text style={styles.mensaje}>{this.props.posts.data.mensaje}</Text>


                <View style={styles.contenedorLike}>

                    <TouchableOpacity style={styles.botonLike} onPress={() => this.handleLike()} >
                        <AntDesign
                            name={this.state.liked ? "like1" : "like2"}
                            size={24}
                            color={this.state.liked ? "#007AFF" : "#A9A9A9"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.cantLikes}>{this.state.cantLikes} Likes</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contenedor: {
        padding: 15,
        backgroundColor: "#FFFFFF",
        marginHorizontal: 15,
        marginVertical: 7,
        borderRadius: 10,
    },
    mensaje: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#303841",
        marginBottom: 10,
    },
    email: {
        fontSize: 14,
        color: "#303841",
        fontWeight: "bold",
        marginBottom: 8,
    },
    contenedorLike: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonLike: {
        padding: 5,
        marginRight: 8,
    },
    cantLikes: {
        fontSize: 14,
        color: "#303841",
    }
});

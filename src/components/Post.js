import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

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

    handleDeletePost = () => {
        const { id } = this.props.posts;

        db.collection('posts').doc(id).delete()
            .then(() => {
                console.log('Post eliminado');
            })
            .catch((error) => {
                console.error('Error eliminando el post:', error);
            });
    }

    render() {
        const { email, mensaje } = this.props.posts.data;
        const isOwner = email === auth.currentUser.email; 

        return (
            <View style={styles.contenedor}>
                <Text style={styles.email}>{email}</Text>
                <Text style={styles.mensaje}>{mensaje}</Text>

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
                {isOwner && (
                    <TouchableOpacity style={styles.button} onPress={this.handleDeletePost}>
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                )}
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
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#e74c3c',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});


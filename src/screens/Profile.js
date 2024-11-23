import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            postUsuario: [],
        };
    }

    deletePost(postId) {
        db.collection("posts")
            .doc(postId)
            .delete()
            .then(() => {
                console.log("Post eliminado");

                this.setState({
                    postUsuario: this.state.postUsuario.filter((post) => post.id !== postId),
                });
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.profileContainer}>
                    <Text style={styles.title}>Mi Perfil</Text>
                    <Text>Email: {this.state.email}</Text>
                    <Text>Nombre de Usuario: {this.state.userName}</Text>
                    <Text>Total de Posteos: {this.state.postUsuario.length}</Text>
                </View>

                <FlatList
                    data={this.state.postUsuario}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Text>{item.title}</Text>
                            <Text>{item.content}</Text>
                            <TouchableOpacity
                                onPress={() => this.deletePost(item.id)}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity
                    onPress={() => auth.signOut().then(() => this.props.navigation.navigate('Login'))}
                    style={styles.logoutButton}
                >
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    profileContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    postContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../firebase/config';
import { Feather } from '@expo/vector-icons';

export default class UsersSearch extends Component {

    constructor() {
        super();
        this.state = {
            usuariosFiltrados: [],
            textoSearch: '',
            mostrarNoResultados: false
        }
    }

    handleSearch() {
        if (this.state.textoSearch.length > 0) {
            db.collection('users')
                .where('userName', '==', this.state.textoSearch)
                .onSnapshot(docs => {
                    console.log(docs);
                    let usuariosFiltrados = [];
                    docs.forEach(doc => {
                        usuariosFiltrados.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    });

                    this.setState({
                        usuariosFiltrados: usuariosFiltrados,
                        mostrarNoResultados: false
                    });
                    if (usuariosFiltrados.length == 0) {
                        this.setState({ mostrarNoResultados: true })
                    }
                    console.log(usuariosFiltrados);
                })

        } else {
            this.setState({ mostrarNoResultados: false, usuariosFiltrados: [] })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar por nombre de usuario..."
                        value={this.state.textoSearch}
                        onChangeText={(text) => this.setState({ textoSearch: text })}
                    />
                    <TouchableOpacity style={styles.iconButton} onPress={() => this.handleSearch()} >
                        <Feather name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {this.state.usuariosFiltrados.length > 0 ? (
                    <FlatList
                        data={this.state.usuariosFiltrados}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.userNameText}>@{item.data.userName}</Text>
                        )}
                    />
                ) : this.state.mostrarNoResultados ? (
                    <Text style={styles.noResults}>No se encontraron resultados</Text>
                ) : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        height: 44,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    iconButton: {
        backgroundColor: '#007BFF',
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    userNameText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    noResults: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
    // userContainer: {
    //     backgroundColor: '#fff',
    //     padding: 10,
    //     marginBottom: 10,
    //     borderRadius: 8,
    // },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 20,
        shadowColor: '#28a745cc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});

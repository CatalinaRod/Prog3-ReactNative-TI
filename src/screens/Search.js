import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../firebase/config';
import { Feather } from '@expo/vector-icons';

export default class UsersSearch extends Component {

    constructor() {
        super();
        this.state = {
            usuarios: [],
            textoSearch: '',
            busquedaRealizada: false
        }
    }

    handleSearch() {
        if (this.state.textoSearch.length > 0) {
            db.collection('users')
                .onSnapshot(docs => {
                    let usuarios = [];
                    docs.forEach(doc => {
                        usuarios.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    });
                    this.setState({
                        usuarios: usuarios,
                        busquedaRealizada: true
                    });
                })
        } else {
            this.setState({
                usuarios: [],
                busquedaRealizada: true
            })
        }
    }

    render() {

        const usuariosFiltrados = this.state.usuarios.filter(user =>
            user.data.userName.toLowerCase().includes(this.state.textoSearch.toLowerCase())
        )

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

                {this.state.busquedaRealizada && (
                    usuariosFiltrados.length === 0 ? (
                        <Text style={styles.noResults}>No se encontraron resultados</Text>
                    ) : (
                        <FlatList
                            data={usuariosFiltrados}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Text style={styles.userNameText}>@{item.data.userName}</Text>
                            )}
                        />
                    )
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1ecf7',
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
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});

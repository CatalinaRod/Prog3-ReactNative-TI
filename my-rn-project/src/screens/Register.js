import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth } from '../firebase/config';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: "",
            registered: false,
            error: ""
        };
    }

    handleSubmit() {
        console.log(this.state.email, this.state.password, this.state.userName);
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password) 
            .then(response => this.setState({ registered: true }))
            .catch(error => this.setState({ error: "Fallo el registro" }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Formulario de Registro</Text>
                <TextInput 
                    keyboardType='email-address' 
                    placeholder='Email' 
                    onChangeText={text => this.setState({ email: text })} 
                    value={this.state.email} 
                    style={styles.input}
                />
                <TextInput 
                    keyboardType='default' 
                    placeholder='Password' 
                    secureTextEntry={true} 
                    onChangeText={text => this.setState({ password: text })} 
                    value={this.state.password} 
                    style={styles.input}
                />
                <TextInput 
                    keyboardType='default' 
                    placeholder='Nombre de Usuario' 
                    onChangeText={text => this.setState({ userName: text })} 
                    value={this.state.userName} 
                    style={styles.input}
                />
                {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
                <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.button}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
                <Text>Navegación cruzada a Login:</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Ir a Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 15,
        textAlign: 'center',
    },
});
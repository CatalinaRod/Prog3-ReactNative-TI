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
            <View style={styles.mainContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Register</Text>
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
                    <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.button}>
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>

                    {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

                    <Text>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Login")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        padding: 40,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        width: '80%',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        width: '50%',
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
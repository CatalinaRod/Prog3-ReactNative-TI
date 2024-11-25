import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: "",
            registered: false,
            emailError: "",
            passwordError: "",
            userNameError: "",
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("HomeMenu");
            }
        });
    }

    validateEmail() {
        if (this.state.email === "") {
            this.setState({ emailError: "El campo email no puede estar vacío." });
            return false;
        } else if (!this.state.email.includes("@")) {
            this.setState({ emailError: "El email no tiene el formato correcto." });
            return false;
        } else {
            this.setState({ emailError: "" });
            return true;
        }
    }

    validatePassword() {
        if (this.state.password === "") {
            this.setState({ passwordError: "La contraseña no puede estar vacía." });
            return false;
        } else if (this.state.password.length < 6) {
            this.setState({ passwordError: "La contraseña debe tener al menos 6 caracteres." });
            return false;
        } else {
            this.setState({ passwordError: "" });
            return true;
        }
    }

    validateUserName() {
        if (this.state.userName === "") {
            this.setState({ userNameError: "El nombre de usuario no puede estar vacío." });
            return false;
        } else {
            this.setState({ userNameError: "" });
            return true;
        }
    }

    handleSubmit() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        const isUserNameValid = this.validateUserName();

        if (isEmailValid && isPasswordValid && isUserNameValid) {
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    this.setState({ registered: true });
                    return db.collection('users').add({
                        email: this.state.email,
                        userName: this.state.userName,
                        createdAt: Date.now(),
                    });
                })
                .then(() => {
                    this.props.navigation.navigate('HomeMenu');
                    this.setState({ email: "", password: "", userName: "" });
                })
                .catch(() => this.setState({ emailError: "Error al registrarse. Intente nuevamente." }));
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Registro</Text>

                    <TextInput
                        keyboardType="email-address"
                        placeholder="Email"
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                        style={styles.input}
                    />
                    {this.state.emailError ? <Text style={styles.error}>{this.state.emailError}</Text> : null}

                    <TextInput
                        keyboardType="default"
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        style={styles.input}
                    />
                    {this.state.passwordError ? <Text style={styles.error}>{this.state.passwordError}</Text> : null}

                    <TextInput
                        keyboardType="default"
                        placeholder="Nombre de Usuario"
                        onChangeText={text => this.setState({ userName: text })}
                        value={this.state.userName}
                        style={styles.input}
                    />
                    {this.state.userNameError ? <Text style={styles.error}>{this.state.userNameError}</Text> : null}

                    <TouchableOpacity
                        onPress={() => this.handleSubmit()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>

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
        backgroundColor: '#e1ecf7',
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
        marginBottom: 10,
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
        width: '50%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

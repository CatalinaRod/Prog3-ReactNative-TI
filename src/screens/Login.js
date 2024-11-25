import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth } from '../firebase/config';

import Fontisto from '@expo/vector-icons/Fontisto';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      login: false
    };
  }

  // Chequea si el usuario está logueado, y lo manda a la pantalla de Home
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    })
  }

  handleSubmit() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        this.props.navigation.navigate('HomeMenu');
      })
      .catch(error => this.setState({
        error: error.message,
        login: true
      }));
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput style={styles.input}
            keyboardType='email-address'
            placeholder='Email'
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />

          <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />

          <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.button}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          {/* Si hay algún error, se muestra en pantalla */}
          {this.state.error.message ? <Text style={styles.error}>{this.state.error.message}</Text> : null}

          <Text style={styles.text}>¿No tienes una cuenta?</Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 20
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 5
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    width: '50%'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center'
  },
  text: {
    marginTop: 20,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '80%'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxIcon: {
    alignSelf: 'center'
  },
  checkboxText: {
    marginLeft: 8,
    alignSelf: 'center'
  }
});
import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from "react-native";
import { Redirect } from "react-router-native";
export default class Login extends React.Component {
  state = {
    name: "",
    password: "",
    isLoggedIn: false,
    isFetching: false
  };
  constructor(props) {
    super(props);
    this.onUserNameChange = this.onChangeText.bind(this, "name");
    this.onPasswordChange = this.onChangeText.bind(this, "password");
  }
  onChangeText(name, val) {
    this.setState({ [name]: val });
  }
  onSubmitEditing = () => {
    this.setState({ isFetching: true });
    return fetch(`https://swapi.co/api/people/?search=${this.state.name}&format=json`)
      .then(response => response.json())
      .then(responseJson => {
        // console.warn(JSON.stringify(responseJson))
        return responseJson.results;
      })
      .then(result => {
        result = result.filter(user => {
          const { name, password } = this.state;
          return user.name === name && user.birth_year === password;
        });
        if (result.length === 1) {
          AsyncStorage.setItem("@xebia:user", result[0].name, error => {
            let isLoggedIn = true;
            if (error) {
              isLoggedIn = false;
              console.error(error);
            }
            this.setState({ isFetching: false, isLoggedIn });
          });
        } else {
          this.setState({ isFetching: false });
        }
      })
      .catch(error => {
        this.setState({ isFetching: false });
        console.error(error);
      });
  };
  render() {
    if (this.state.isLoggedIn) {
      return <Redirect push={false} to={this.props.afterLogin} />;
    }
    const textInputProps = {
      underlineColorAndroid: "#fff",
      style: styles.textInput,
      placeholderTextColor: "#fff",
      onSubmitEditing: this.onSubmitEditing
    };
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput
            {...textInputProps}
            value={this.state.name}
            onChangeText={this.onUserNameChange}
            placeholder={"User name"}
          />
          <TextInput
            {...textInputProps}
            value={this.state.password}
            onChangeText={this.onPasswordChange}
            placeholder={"Password"}
          />
          <TouchableOpacity onPress={this.onSubmitEditing} centered style={styles.submitButton}>
            <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
        {this.state.isFetching &&
          <View pointerEvents="box-only" style={StyleSheet.absoluteFill}>
            <ActivityIndicator style={styles.activityIndicator} />
          </View>}

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8382d",
    justifyContent: "center",
    padding: 50
  },
  innerContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    minHeight: 270,
    padding: 20
  },
  textInput: {
    color: "white",
    height: 45,
    marginBottom: 20
  },
  submitButton: {
    backgroundColor: "#fff",
    borderRadius: 3,
    padding: 10
  },
  submitText: {
    color: "#e8382d",
    textAlign: "center"
  },
  activityIndicator: {
    flex: 1
  }
});

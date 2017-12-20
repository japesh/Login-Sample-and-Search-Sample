import React from "react";
import { TouchableOpacity, Text, StyleSheet, AsyncStorage } from "react-native";
import { Redirect } from "react-router-native";
export default class Logout extends React.Component {
  state = {
    isLoggedOut: false
  };
  logout = () => {
    AsyncStorage.setItem("@xebia:user", "", error => {
      if (error) {
        console.error(error);
      }
      this.setState({ isLoggedOut: true });
    });
  };
  render() {
    const { loginPath } = this.props;
    if (this.state.isLoggedOut) {
      return <Redirect push={false} to={loginPath} />;
    }
    return (
      <TouchableOpacity onPress={this.logout} style={styles.container}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    color: "#fff"
  }
});

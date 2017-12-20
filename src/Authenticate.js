import React from "react";
import { StyleSheet, ActivityIndicator, AsyncStorage } from "react-native";
import { Redirect } from "react-router-native";
export default class Authenticate extends React.Component {
  state = {
    user: false,
    isFetching: true
  };

  componentWillMount() {
    AsyncStorage.getItem("@xebia:user", (error, result) => {
      if (error) {
        console.error(error);
      }
      this.setState({ isFetching: false, user: result });
    });
  }

  render() {
    const { user, isFetching } = this.state;
    const { loginPath, children } = this.props;
    if (user) {
      return children({ user });
    }
    if (!isFetching) {
      return <Redirect to={loginPath} />;
    }
    return <ActivityIndicator style={StyleSheet.absoluteFill} />;
  }
}

import React from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";

import { NativeRouter, Route, Switch } from "react-router-native";
import Login from "./Login";
import Home from "./Home";

export default (App = () => (
  <NativeRouter initialEntries={["/"]} initialIndex={1}>
    <View style={styles.container}>
      <Switch>
        <Route path="/login" afterLogin="/">
          {() => {
            return <Login afterLogin="/" />;
          }}
        </Route>
        <Route path="/">
          {() => {
            return <Home loginPath="/login" />;
          }}
        </Route>
      </Switch>
    </View>
  </NativeRouter>
));

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

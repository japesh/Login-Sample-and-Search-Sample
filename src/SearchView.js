import React from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
export default class SearchView extends React.Component {
  count = 0;
  shouldComponentUpdate() {
    return false;
  }
  onChangeText = value => {
    if (this.count >= 15 && this.props.user !== "Luke Skywalker") {
      Alert.alert("You can not make more then 15 searches in a minute");
      return;
    }
    clearTimeout(this.interval);
    this.interval = setTimeout(() => {
      this.interval = undefined;
      this.count++;
      this.props.onChange(value);
      setTimeout(() => {
        this.count--;
      }, 60000);
    }, 200);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.onChangeText}
          style={styles.textInput}
          placeholderTextColor={"#fff"}
          underlineColorAndroid={"#fff"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8382d",
    padding: 10
  },
  textInput: {
    color: "white",
    height: 45,
    marginBottom: 20
  }
});

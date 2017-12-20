import React from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Authenticate from "./Authenticate";
import Logout from "./Logout";
import SearchView from "./SearchView";
import ListItem from "./ListItem";
export default class Home extends React.Component {
  state = {
    data: [],
    selectedIndex: false
  };
  onChange = value => {
    this.setState({ isFetching: true });
    fetch(`https://swapi.co/api/planets/?search=${value}&format=json`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ isFetching: false, data: response.results, selectedIndex: false });
      })
      .catch(err => {
        this.setState({ isFetching: false });
        console.error(err);
      });
  };

  componentWillMount() {
    this.onChange("");
  }

  keyExtractor = item => item.name;
  onPressItem = selectedIndex => this.setState({ selectedIndex });
  renderItem = ({ item, index }) => (
    <ListItem item={item} selected={this.state.selectedIndex === index} index={index} onPressItem={this.onPressItem} />
  );

  render() {
    const { loginPath } = this.props;
    const { selectedIndex, data, isFetching } = this.state;
    return (
      <Authenticate loginPath={loginPath}>
        {({ user }) => {
          return [
            <View style={styles.header} key="search view">
              <Logout loginPath={loginPath} />
            </View>,
            <View style={styles.container} key="body">
              <SearchView user={user} onChange={this.onChange} />
              <View style={styles.container}>
                <FlatList
                  extraData={selectedIndex}
                  data={data}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
                />
                {!isFetching &&
                  data.length === 0 &&
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        alignItems: "center",
                        justifyContent: "center"
                      }
                    ]}
                  >
                    <Text>Their is no data to show</Text>
                  </View>}
                {isFetching && <ActivityIndicator style={StyleSheet.absoluteFill} />}
              </View>
            </View>
          ];
        }}
      </Authenticate>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#e8382d",
    alignItems: "flex-end"
  }
});

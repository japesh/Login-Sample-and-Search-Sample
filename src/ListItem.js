import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
function RowValue({ item, value }) {
  return (
    <Text style={styles.rowInfo}>
      <Text style={styles.rowHeading}>{value} </Text>:
      <Text> {item[value]}</Text>
    </Text>
  );
}
export default class ListItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.selected !== nextProps.nextProps) {
      return true;
    }
    return false;
  }

  onPressItem = () => {
    const { onPressItem, index } = this.props;
    onPressItem(index);
  };

  render() {
    const { item, selected } = this.props;
    return (
      <TouchableOpacity onPress={this.onPressItem} style={styles.row}>
        <Text>{item.name}</Text>
        {selected &&
          <View style={styles.rowInfoContainer}>
            <RowValue item={item} value="population" />
            <RowValue item={item} value="climate" />
            <RowValue item={item} value="diameter" />
            <RowValue item={item} value="gravity" />
            <RowValue item={item} value="rotation_period" />
            <RowValue item={item} value="surface_water" />
            <RowValue item={item} value="terrain" />
          </View>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 5,
    backgroundColor: "#fff",
    marginBottom: 1,
    elevation: 1
  },
  rowHeading: {
    fontWeight: "bold"
  },
  rowInfoContainer: {
    padding: 5,
    backgroundColor: "#efefef"
  },
  rowInfo: {
    marginBottom: 5
  }
});

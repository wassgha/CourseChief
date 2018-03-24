import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export default class SearchBar extends Component {

  render() {
    const {
      style={},
      children
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        { children }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'column',
    overflow: 'hidden'
  }
});

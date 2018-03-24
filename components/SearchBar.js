import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export default class SearchBar extends Component {

  render() {
    const {
      placeholder = 'Search ...',
      icon = 'magnify',
      style = {},
      onChangeText,
      value = ''
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#333'}
          underlineColorAndroid='transparent'
          blurOnSubmit
        />
        <Touchable
          style={styles.iconContainer}
          onPress={() => {
            if (value !== '') {
              onChangeText('');
            }
          }}
        >
          <Icon
            name={value === '' ? icon : 'close'}
            size={20}
            color={'#333'}
            style={{padding: 20}}
            />
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  input: {
    height: 60,
    padding: 20,
    paddingRight: 0,
    flex: 1,
    fontSize: 16
  },
  iconContainer: {
    borderRadius: 8
  }
});

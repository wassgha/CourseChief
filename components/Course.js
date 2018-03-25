import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Card from './Card';
import _ from 'lodash';

export default class Course extends React.Component {

  render() {
    const {onPress, selected, term, id, course_title, course_descr} = this.props;
    return (
      <Card key={id}>
        <View style={styles.labelTitleContainer}>
          <View style={styles.label}>
            <Text style={styles.labelText}>
              { term }
            </Text>
          </View>
          <Text
            style={styles.courseTitle}
            numberOfLines={1}>
            { course_title }
          </Text>
          <TouchableOpacity style={styles.plusButton} onPress={onPress}>
            <Text style={styles.plusButtonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.courseDesc}>
          { (course_descr != 'null') ? _.truncate(this.props.course_descr, {length: 120}) : (<Text> Course Description is not available </Text>) }
        </Text>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  labelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    borderRadius: 3,
    backgroundColor: '#8e44ad',
    padding: 4,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  labelText: {
    color: 'white',
    textAlign: 'center'
  },
  plusButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1
  },
  plusButton: {
    backgroundColor: '#8e44ad',
    width: 24,
    height: 24,
    margin: 5,
    borderRadius: 24/2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

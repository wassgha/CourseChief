import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Card from './Card';
import _ from 'lodash';
import moment from 'moment';

export default class EventListScreen extends React.Component {
  render() {
    const {onPress, id, category, selected, start, end, name, location, description, rsvps } = this.props;
    return (
      <TouchableOpacity onPress={onPress}><Card key={id}>
        <View style={styles.row}>
          <View style={[styles.label, {backgroundColor: category.color}]}>
            <Text style={styles.labelText}>
              { category.name }
            </Text>
          </View>
          <Text
            style={styles.title}
            numberOfLines={1}>
            { name }
          </Text>
          { onPress && <Icon style={styles.heartButton} name={`heart${selected ? '' : '-outline'}`} size={24} color={'#c0392b'} /> }
        </View>
        <View style={styles.row}>
          <Icon name={'clock'} size={18} style={styles.clock} />
          <Text style={styles.clock}>
            { moment(start).format("MMM D, h:mm A") } -
            {
              moment(end).format("MMM D") === moment(start).format("MMM D") ?
              moment(end).format(" h:mm A") : moment(end).format("MMM D, h:mm")
            }
          </Text>
          <Icon name={'account-multiple'} size={18} style={styles.rsvp} />
          <Text style={styles.rsvp}>
            { rsvps }
          </Text>
          {
            _.includes(description, ['pizza', 'lunch', 'snacks']) &&
            <Text style={{marginLeft: 5}}>🍕</Text>
          }
          {
            _.includes(description, ['cookie']) &&
            <Text style={{marginLeft: 5}}>🍪</Text>
          }
        </View>
        <Text style={styles.desc}>
          { (description != 'null') ? _.truncate(description, {length: 120}) : (<Text> Event description is not available </Text>) }
        </Text>
        <Text style={styles.row}>
          <Icon name={'map-marker'} size={16} style={styles.location} />
          <Text style={styles.location}>
            {location}
          </Text>
        </Text>
      </Card></TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  label: {
    borderRadius: 3,
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
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1
  },
  desc: {
    marginBottom: 10
  },
  rsvp: {
    marginLeft: 5,
    color: '#999'
  },
  clock: {
    marginRight: 5,
  },
  location: {
    color: '#777',
    textAlignVertical: 'center'
  },
  heartButton: {
    width: 24,
    height: 24,
    borderRadius: 24/2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

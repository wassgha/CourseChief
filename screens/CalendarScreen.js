import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import Event from '../components/Event'
import { SafeAreaView } from 'react-navigation';
import Touchable from 'react-native-platform-touchable';
import { WebBrowser } from 'expo';
import _ from 'lodash';

import Colors from '../constants/Colors';

class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  constructor (props) {
    super(props);

    this.state = {
      items: this.fillWithEvent(this.props.myEvents)
    }
  };

  fillWithEvent(events) {
    return _.transform(
      events,
      (result, el) => {
        const key = el.start.split('T')[0];
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(el);
      },
      {}
    )
  }

  componentWillReceiveProps(newProps) {
    this.fillWithEvent(newProps.myEvents);
  }

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <Agenda
          items={this.state.items}
          selected={moment(new Date()).format('YYYY-MM-DD')}
          pastScrollRange={12}
          futureScrollRange={12}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          theme={{
            selectedDayBackgroundColor: Colors.tintColor,
            todayTextColor: Colors.tintColor,
            dotColor: Colors.tintColor,
            agendaDayTextColor: Colors.tintColor,
            agendaDayNumColor: Colors.tintColor,
            agendaTodayColor: Colors.tintColor,
            agendaKnobColor: Colors.tintColor
          }}
        />
      </SafeAreaView>
    );
  }

  loadItems(day) {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this._timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
      }
    }
    this.setState({
      ... this.state
    })
  }

  renderItem(item) {
    const { id, category, name, location, description, start, end, rsvps } = item;
    return (
      <Event
        key={id}
        id={id}
        category={category}
        selected={true}
        name={name}
        location={location}
        description={description}
        start={start}
        end={end}
        rsvps={rsvps}
        />
    );
  }

  _timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No events happening on this day.</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderLeftWidth: 4
  },
  itemText: {
    fontFamily: 'Nunito',
    color: '#333'
  },
  detailText: {
    fontFamily: 'Nunito',
    color: '#AAA'
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

const mapStateToProps = (state) => ({
    myEvents: state.myEvents
})

export default connect(mapStateToProps)(CalendarScreen);

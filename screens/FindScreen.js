import React from 'react';
import { ScrollView, RefreshControl, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Event from '../components/Event.js'
import { ExpoLinksView } from '@expo/samples';
import SearchBar from '../components/SearchBar';
import * as API from '../helpers/helper_api';
import _ from 'lodash';
import { toggleEvent } from '../actions';
import randomColor from 'randomcolor';


class FindEventsScreen extends React.Component {
  static navigationOptions = {
    title: 'Find Events',
  };

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true,
      search: ''
    }
    this.categoryColors = {

    }
    this.refresh();
  }

  refresh() {
    API.listEvents().then(
      events => this.setState({
        events: events.map(event => {
          if (!this.categoryColors[event.category.name])
            this.categoryColors[event.category.name] = randomColor({ luminosity: 'dark'});
          event.category.color = this.categoryColors[event.category.name];
          return event;
        }),
        loading: false
      })
    )
  }

  render() {
    const { events, loading, search } = this.state;
    const { toggleEvent, myEvents } = this.props;

    const filteredEvents = _.filter(events, (event) => _.includes(
          _.lowerCase(event.name),
          _.lowerCase(search)
      )
    )

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {}}
          />
        }>
        <SearchBar
          showLoading
          platform='android'
          onChangeText={() => {}}
          onClear={() => {}}
          placeholder='Look up events...'
          onChangeText={(search) => this.setState({search})}
          value={search} />

        {
          filteredEvents &&
          filteredEvents.map(({ id, category, name, occurrences, location, description, rsvps }) => {
            return (
              <Event
                onPress={() => {
                  toggleEvent({ id, category, name, start: occurrences[0].starts_at, end: occurrences[0].ends_at, location, description, rsvps })
                }}
                key={id}
                id={id}
                category={category}
                selected={_.find(myEvents, {id: id})}
                name={name}
                location={location}
                description={description}
                start={occurrences[0].starts_at}
                end={occurrences[0].ends_at}
                rsvps={rsvps}
                />
            )
          })
        }
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    toggleEvent: (event_id) => dispatch(toggleEvent(event_id))
})


const mapStateToProps = (state) => ({
    myEvents: state.myEvents
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FindEventsScreen);

import React from 'react';
import { ScrollView, RefreshControl, View, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import * as API from '../helpers/helper_api';
import _ from 'lodash';

export default class CoursesScreen extends React.Component {
  static navigationOptions = {
    title: 'Courses',
  };

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loading: true,
      search: ''
    }
    this.refresh();
  }

  refresh() {
    API.listCourses().then(courses => this.setState({courses, loading: false}))
  }

  render() {
    const { courses, loading, search } = this.state;

    const filteredCourses = _.filter(courses, (course) => _.includes(
          _.lowerCase(course.course_title),
          _.lowerCase(search)
      )
    )

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => this.refresh()}
          />
        }>
        <SearchBar
          showLoading
          platform='android'
          onChangeText={() => {}}
          onClear={() => {}}
          placeholder='Type Here...'
          onChangeText={(search) => this.setState({search})}
          value={search} />

        {
          filteredCourses &&
          filteredCourses.map(({ course_title, course_descr, course_id, term_descr }) => {
            return (
              <Card key={course_id}>
                <View style={styles.labelTitleContainer}>
                  <View style={styles.label}>
                    <Text style={styles.labelText}>
                      { term_descr }
                    </Text>
                  </View>
                  <Text
                    style={styles.courseTitle}
                    numberOfLines={1}>
                    { course_title }
                  </Text>
                </View>
                <Text style={styles.courseDesc}>
                  { _.truncate(course_descr, {length: 120}) }
                </Text>
              </Card>
            )
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15
  },
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
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1
  }

});

import React from 'react';
import { ScrollView, RefreshControl, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Course from '../components/Course.js'
import { ExpoLinksView } from '@expo/samples';
import SearchBar from '../components/SearchBar';
import * as API from '../helpers/helper_api';
import _ from 'lodash';
import { toggleCourse } from '../actions';

class CoursesScreen extends React.Component {
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
    const { selectCourse, selectedCourses } = this.props;

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
        <Text>
          Selected courses : {selectedCourses && selectedCourses.join(',')}
        </Text>
        <SearchBar
          showLoading
          platform='android'
          onChangeText={() => {}}
          onClear={() => {}}
          placeholder='Look up courses...'
          onChangeText={(search) => this.setState({search})}
          value={search} />

        {
          filteredCourses &&
          filteredCourses.map(({ course_title, course_descr, course_id, term_descr }) => {
            return (
              <Course onPress={() => {
                  selectCourse(course_id)
                }}
                key={course_id}
                id={course_id}
                term={term_descr}
                course_title={course_title}
                course_descr={course_descr} />
            )
          })
        }
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    selectCourse: (course_id) => dispatch(toggleCourse(course_id))
})


const mapStateToProps = (state) => ({
    selectedCourses: state.toggleCourse
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen);

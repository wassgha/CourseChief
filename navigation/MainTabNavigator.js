import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import FindScreen from '../screens/FindScreen';
import CalendarScreen from '../screens/CalendarScreen';

export default TabNavigator(
  {
    Find: {
      screen: FindScreen,
    },
    Calendar: {
      screen: CalendarScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Find':
            iconName = 'calendar-plus';
            break;
          case 'Calendar':
            iconName = 'calendar';
        }
        return (
          <Icon
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

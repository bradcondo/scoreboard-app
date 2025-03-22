import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

import LeaderboardNavigator from '@navigators/LeaderboardNavigator';
import SkinsNavigator from '@navigators/SkinsNavigator';
import RoundsNavigator from '@navigators/RoundsNavigator';
import PlayNavigator from '@navigators/PlayNavigator';
import {StackParamList} from '@navigators/AppNavigator';

import colors from '@styles/colors';

const AppTabs = createBottomTabNavigator();

type NavigationType = StackNavigationProp<StackParamList, 'Outing'>;
export interface Props {
  navigation: NavigationType;
}

const OutingNavigator = ({}: Props) => {
  return (
    <AppTabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          var icon = 'alert-circle-outline';
          if (route.name === 'Leaderboard') {
            icon = 'trophy-outline';
          } else if (route.name === 'Skins') {
            icon = 'cash-outline';
          } else if (route.name === 'Rounds') {
            icon = 'list-outline';
          } else if (route.name === 'Play') {
            icon = 'golf-outline';
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.red,
        inactiveTintColor: 'gray',
      }}>
      <AppTabs.Screen name="Leaderboard" component={LeaderboardNavigator} />
      <AppTabs.Screen name="Skins" component={SkinsNavigator} />
      <AppTabs.Screen name="Rounds" component={RoundsNavigator} />
      <AppTabs.Screen name="Play" component={PlayNavigator} />
    </AppTabs.Navigator>
  );
};

export default OutingNavigator;

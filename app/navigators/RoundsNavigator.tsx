import React from 'react';
import {View} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isNil} from 'lodash';

import {useOuting} from '@contexts/OutingContext';
import SelectRoundScreen from '@screens/RoundsSelectRoundScreen';
import ScorecardsScreen from '@screens/RoundsScorecardsScreen';

import layout from '@styles/layout';
import colors from '@styles/colors';

export type StackParamList = {
  SelectRound: undefined;
  Scorecards: {outingRound: object};
};

const Stack = createStackNavigator();

type NavigationType = StackNavigationProp<StackParamList, 'SelectRound'>;
export interface Props {
  navigation: NavigationType;
}

const RoundsNavigator = ({}: Props) => {
  const {outing, refreshOuting} = useOuting();

  if (isNil(outing)) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName="SelectRound"
      screenOptions={{
        headerTitle: outing?.name,
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={layout.headerRight}>
            <Ionicons
              name="refresh-circle-outline"
              size={28}
              color={colors.darkGray}
              onPress={() => refreshOuting()}
            />
          </View>
        ),
      }}>
      <Stack.Screen name="SelectRound" component={SelectRoundScreen} />
      <Stack.Screen name="Scorecards" component={ScorecardsScreen} />
    </Stack.Navigator>
  );
};

export default RoundsNavigator;

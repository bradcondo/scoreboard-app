import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { isNil } from "lodash";

import { useOuting } from "@/contexts/OutingContext";
import SelectRoundScreen from "@/screens/PlaySelectRoundScreen";
import SelectGroupScreen from "@/screens/PlaySelectGroupScreen";
import ScoresScreen from "@/screens/PlayScoresScreen";

import layout from "@/styles/layout";
import colors from "@/styles/colors";

export type StackParamList = {
  SelectRound: undefined;
  SelectGroup: { outingRound: object };
  Scores: { outingRound: object; outingGroup: object };
};

const Stack = createStackNavigator();

type NavigationType = StackNavigationProp<StackParamList, "SelectRound">;
export interface Props {
  navigation: NavigationType;
}

const PlayNavigator = ({}: Props) => {
  const { outing, refreshOuting } = useOuting();

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
      }}
    >
      <Stack.Screen name="SelectRound" component={SelectRoundScreen} />
      <Stack.Screen name="SelectGroup" component={SelectGroupScreen} />
      <Stack.Screen name="Scores" component={ScoresScreen} />
    </Stack.Navigator>
  );
};

export default PlayNavigator;

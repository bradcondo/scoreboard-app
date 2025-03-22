import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import LeaderboardScreen from "@/screens/LeaderboardScreen";
import { useOuting } from "@/contexts/OutingContext";

import colors from "@/styles/colors";
import layout from "@/styles/layout";

export type StackParamList = { Leaderboard: undefined };

const Stack = createStackNavigator();
const Navigator = () => {
  const { outing, refreshOuting } = useOuting();

  return (
    <Stack.Navigator
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
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "@/screens/LoginScreen";
import LogoutScreen from "@/screens/LogoutScreen";
import SelectOutingScreen from "@/screens/SelectOutingScreen";
import OutingNavigator from "@/navigators/OutingNavigator";

export type StackParamList = {
  Outing: undefined;
  SelectOuting: undefined;
  Login: undefined;
  Logout: undefined;
};

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerBackTitleVisible: false }}
    >
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen name="Logout" component={LogoutScreen} />
      <AppStack.Screen name="SelectOuting" component={SelectOutingScreen} />
      <AppStack.Screen
        name="Outing"
        component={OutingNavigator}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;

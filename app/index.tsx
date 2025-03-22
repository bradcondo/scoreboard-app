import React from "react";
import { SafeAreaView } from "react-native";
import "react-native-gesture-handler";

declare const global: { HermesInternal: null | {} };

import { AppConfigContextProvider } from "@/contexts/AppConfigContext";
import { OutingContextProvider } from "@/contexts/OutingContext";
import AppNavigator from "@/navigators/AppNavigator";

import layout from "@/styles/layout";

const Index = () => {
  return (
    <SafeAreaView style={layout.container}>
      <AppConfigContextProvider>
        <OutingContextProvider>
          <AppNavigator />
        </OutingContextProvider>
      </AppConfigContextProvider>
    </SafeAreaView>
  );
};

export default Index;

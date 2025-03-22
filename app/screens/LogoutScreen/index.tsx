import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppConfig } from "@/contexts/AppConfigContext";
import { useOuting } from "@/contexts/OutingContext";
import { StackParamList } from "@/navigators/AppNavigator";

type NavigationType = StackNavigationProp<StackParamList, "Logout">;
interface Props {
  navigation: NavigationType;
}

const LogoutScreen = ({ navigation }: Props) => {
  const { setPlayer } = useAppConfig();
  const { setOuting } = useOuting();

  useEffect(() => {
    setPlayer(undefined);
    setOuting(undefined);
    navigation.navigate("Login");
  }, [navigation, setPlayer, setOuting]);

  return null;
};

export default LogoutScreen;

import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { isNil } from "lodash";

import { useAppConfig } from "@/contexts/AppConfigContext";
import { useOuting } from "@/contexts/OutingContext";
import Outing from "@/models/Outing";
import { StackParamList } from "@/navigators/AppNavigator";

import style from "./style";

type NavigationType = StackNavigationProp<StackParamList, "SelectOuting">;
export interface Props {
  navigation: NavigationType;
}

const SelectOutingScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { outings } = useAppConfig();
  const { outing, setOuting } = useOuting();

  useEffect(() => {
    if (!isNil(outing)) {
      navigation.navigate("Outing");
    }
  }, [navigation, outing]);

  const selectOutingHandler = (selectedOuting: Outing) => {
    if (!isNil(outing) && outing.id === selectedOuting.id) {
      navigation.navigate("Outing");
    } else {
      setOuting(selectedOuting);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.header}>Select Outing</Text>

      <ScrollView>
        {outings.map((x) => {
          return (
            <TouchableHighlight
              key={`outing-${x.id}`}
              style={style.button}
              onPress={() => selectOutingHandler(x)}
            >
              <Text style={style.buttonText}>{x.name}</Text>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SelectOutingScreen;

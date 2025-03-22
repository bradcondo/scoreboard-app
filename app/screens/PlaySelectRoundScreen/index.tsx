import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { isNil } from "lodash";

import { useOuting } from "@/contexts/OutingContext";
import OutingRound from "@/models/OutingRound";
import { StackParamList } from "@/navigators/PlayNavigator";

import style from "./style";

type NavigationType = StackNavigationProp<StackParamList, "SelectRound">;
export interface Props {
  navigation: NavigationType;
}

const SelectRoundScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { outingRounds } = useOuting();

  const selectRoundHandler = (selectedOutingRound: OutingRound) => {
    navigation.navigate("SelectGroup", {
      outingRound: selectedOutingRound.dump(),
    });
  };

  return (
    <View style={style.container}>
      <Text style={style.header}>Play: Select Round</Text>

      {outingRounds.map((x) => {
        return (
          <TouchableHighlight
            key={`outing-${x.id}`}
            style={style.button}
            onPress={() => selectRoundHandler(x)}
          >
            <Text style={style.buttonText}>
              {x.course.name} @ {!isNil(x.teeTime) ? x.when() : null}
            </Text>
          </TouchableHighlight>
        );
      })}
    </View>
  );
};

export default SelectRoundScreen;

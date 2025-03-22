import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { isNil } from "lodash";

import Api from "@/services/Api";
import { useOuting } from "@/contexts/OutingContext";
import Skins from "@/models/Skins";
import ToPar from "@/components/ToPar";
import { StackParamList } from "@/navigators/SkinsNavigator";

import layout from "@/styles/layout";
import style from "./style";

type NavigationType = StackNavigationProp<StackParamList, "Skins">;
export interface Props {
  navigation: NavigationType;
}

const SkinsScreen = ({}: Props) => {
  const { outing } = useOuting();
  const [skins, setSkins] = useState<Skins[]>([]);

  useEffect(() => {
    if (!isNil(outing)) {
      Api.getSkins(outing.id).then((foundSkins) => {
        setSkins(foundSkins);
      });
    }
  }, [outing]);

  return (
    <View style={{ ...layout.container, ...style.container }}>
      <ScrollView>
        {skins.map((roundSkins) => {
          return (
            <View key={`round-${roundSkins.outingRoundId}`}>
              <Text style={style.header}>
                {roundSkins.courseName} -{" "}
                {!isNil(roundSkins.teeTime)
                  ? roundSkins.teeTime.toLocaleDateString()
                  : null}{" "}
                - ({roundSkins.skins.length})
              </Text>
              <View style={style.table}>
                <View style={{ ...style.row, ...style.headerRow }}>
                  <View
                    style={{
                      ...style.cell,
                      ...style.headerCell,
                      ...style.cellName,
                      ...style.headerCellName,
                    }}
                  >
                    <Text style={style.headerRowText}>Player</Text>
                  </View>
                  <View
                    style={{
                      ...style.cell,
                      ...style.headerCell,
                    }}
                  >
                    <Text style={style.headerRowText}>Hole</Text>
                  </View>
                  <View
                    style={{
                      ...style.cell,
                      ...style.headerCell,
                    }}
                  >
                    <Text style={style.headerRowText}>Par</Text>
                  </View>
                  <View
                    style={{
                      ...style.cell,
                      ...style.headerCell,
                    }}
                  >
                    <Text style={style.headerRowText}>Score</Text>
                  </View>
                  <View
                    style={{
                      ...style.cell,
                      ...style.headerCell,
                    }}
                  >
                    <Text style={style.headerRowText}>Net</Text>
                  </View>
                </View>
                {roundSkins.skins.map((skin, index) => (
                  <View
                    key={`round-${roundSkins.outingRoundId}-${index}`}
                    style={style.row}
                  >
                    <View style={{ ...style.cell, ...style.cellName }}>
                      <Text
                        style={{
                          ...style.cellText,
                          ...style.nameText,
                        }}
                      >
                        {skin.playerNickname}
                      </Text>
                    </View>
                    <View style={style.cell}>
                      <Text style={style.cellText}>{skin.holeNumber}</Text>
                    </View>
                    <View style={style.cell}>
                      <Text style={style.cellText}>{skin.holePar}</Text>
                    </View>
                    <View style={style.cell}>
                      <Text style={style.cellText}>{skin.score}</Text>
                      <ToPar toPar={skin.toPar} gray={false} />
                    </View>
                    <View style={style.cell}>
                      <Text style={style.cellText}>{skin.netScore} </Text>
                      <ToPar toPar={skin.netToPar} gray={false} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SkinsScreen;

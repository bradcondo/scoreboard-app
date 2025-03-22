import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { isNil, sortBy } from "lodash";

import Scorecard from "@/models/Scorecard";
import Api from "@/services/Api";
import GroupScorecard from "@/components/GroupScorecard";
import { StackParamList } from "@/navigators/RoundsNavigator";
import OutingGroup from "@/models/OutingGroup";

import style from "./style";
import OutingRound from "@/models/OutingRound";
import { useOuting } from "@/contexts/OutingContext";

type NavigationType = StackNavigationProp<StackParamList, "Scorecards">;
type Route = RouteProp<StackParamList, "Scorecards">;
export interface Props {
  navigation: NavigationType;
  route: Route;
}

const ScorecardsScreen: React.FC<Props> = ({ route }: Props) => {
  const outingRound = OutingRound.parse(route.params.outingRound);
  const sortedOutingGroups = sortBy(outingRound.groups, "number");

  return (
    <View style={style.container}>
      <Text style={style.header}>
        {outingRound.course.name} @ {outingRound.when()}
      </Text>
      <ScrollView style={style.scrollContainer}>
        {sortedOutingGroups.map((outingGroup) => (
          <OutingGroupScorecard
            key={`scorecard-${outingGroup.id}`}
            outingGroup={outingGroup}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const OutingGroupScorecard = ({
  outingGroup,
}: {
  outingGroup: OutingGroup;
}) => {
  const { outing } = useOuting();
  const [scorecard, setScorecard] = useState<Scorecard>();

  useEffect(() => {
    if (!isNil(outing)) {
      Api.getScorecard(outingGroup.id).then((foundScorecard) => {
        setScorecard(foundScorecard);
      });
    }
  }, [outing, outingGroup]);

  if (isNil(scorecard)) {
    return null;
  }

  return (
    <View>
      <Text style={style.header2}>Group {outingGroup.number}</Text>
      <GroupScorecard scorecard={scorecard} />
    </View>
  );
};

export default ScorecardsScreen;

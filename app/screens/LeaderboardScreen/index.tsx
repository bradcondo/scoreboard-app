import React, { useEffect, useState } from "react";
import { Text, TextStyle, View, ScrollView } from "react-native";
import { isNil } from "lodash";
import { StackNavigationProp } from "@react-navigation/stack";

import Api from "@/services/Api";
import { useOuting } from "@/contexts/OutingContext";
import LeaderboardRow from "@/models/LeaderboardRow";
import { toOrdinal } from "@/utils/ordinal";
import { useAppConfig } from "@/contexts/AppConfigContext";
import ToPar from "@/components/ToPar";
import { StackParamList } from "@/navigators/LeaderboardNavigator";

import layout from "@/styles/layout";
import colors from "@/styles/colors";
import style from "./style";

type NavigationType = StackNavigationProp<StackParamList, "Leaderboard">;
export interface Props {
  navigation: NavigationType;
}

const LeaderboardScreen: React.FC<Props> = ({}: Props) => {
  const { outing, outingRounds } = useOuting();
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>();
  const { orientation } = useAppConfig();

  useEffect(() => {
    if (!isNil(outing)) {
      Api.getLeaderboard(outing.id).then((foundLeaderboard) => {
        setLeaderboard(foundLeaderboard);
      });
    }
  }, [outing]);

  if (isNil(leaderboard)) {
    return null;
  }

  return (
    <View style={{ ...layout.container, ...style.container }}>
      <ScrollView>
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
            {outingRounds.map((outingRound, index) => (
              <View
                key={`round-header-${outingRound.id}`}
                style={{
                  ...style.cell,
                  ...style.headerCell,
                  ...style.cellRound,
                }}
              >
                <Text style={style.headerRowText}>R{index + 1}</Text>
              </View>
            ))}
            <View
              style={{
                ...style.cell,
                ...style.headerCell,
                ...style.cellTotal,
                ...style.headerCellTotal,
              }}
            >
              <Text style={style.headerRowText}>Total</Text>
            </View>
            {orientation === "horizontal" && (
              <>
                <View
                  style={{
                    ...style.cell,
                    ...style.headerCell,
                    ...style.cellStat,
                  }}
                >
                  <Text style={style.headerRowText}>B</Text>
                </View>
                <View
                  style={{
                    ...style.cell,
                    ...style.headerCell,
                    ...style.cellStat,
                  }}
                >
                  <Text style={style.headerRowText}>E</Text>
                </View>
              </>
            )}
          </View>

          {leaderboard.map((row, index) => (
            <LeaderboardTableRow
              key={`leaderboard-player-${row.player.id}`}
              row={row}
              position={index + 1}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const LeaderboardTableRow = ({
  row,
  position,
}: {
  row: LeaderboardRow;
  position: number;
}) => {
  const { orientation } = useAppConfig();
  const { outingRounds } = useOuting();

  return (
    <View style={style.row}>
      <NameCell
        name={`${row.player.nickname}`}
        position={position}
        handicap={row.handicap}
      />

      {outingRounds.map((outingRound, index) => {
        const score = row.scores.find(
          (x) => x.outingRoundId === outingRound.id,
        );

        return (
          <RoundCell
            key={`player-row-${row.player.id}-${index}`}
            score={!isNil(score) ? score.score : undefined}
            toPar={!isNil(score) ? score.toPar : undefined}
            netScore={!isNil(score) ? score.netScore : undefined}
            netToPar={!isNil(score) ? score.netToPar : undefined}
            highest={!isNil(score) ? score.highest : undefined}
          />
        );
      })}

      <TotalCell
        score={row.score}
        toPar={row.toPar}
        netScore={row.netScore}
        netToPar={row.netToPar}
      />

      {orientation === "horizontal" && (
        <>
          <StatCell stat={row.birdies} />
          <StatCell stat={row.eagles} />
        </>
      )}
    </View>
  );
};

const NameCell = ({
  name,
  position,
  handicap,
}: {
  name: string;
  position: number;
  handicap: number;
}) => {
  return (
    <View style={{ ...style.cell, ...style.cellName }}>
      <Text style={style.position}>{toOrdinal(position)}</Text>
      <Text style={style.handicap}>{handicap}</Text>
      <Text style={{ ...style.nameText, ...style.highlightText }}>{name}</Text>
    </View>
  );
};

const RoundCell = ({
  score,
  toPar,
  netScore,
  netToPar,
  highest = false,
}: {
  score: number | undefined;
  toPar: number | undefined;
  netScore: number | undefined;
  netToPar: number | undefined;
  highest: boolean | undefined;
}) => {
  const backgroundColor = highest ? colors.lightGray : "transparent";
  const color = highest ? colors.darkGray : style.highlightText.color;
  const textDecorationLine: TextStyle["textDecorationLine"] = highest
    ? "line-through"
    : "none";

  return (
    <View style={{ ...style.cell, ...style.cellRound, backgroundColor }}>
      <View style={style.cellTop}>
        <Text
          style={{
            ...style.cellText,
            textDecorationLine,
          }}
        >
          {score}
        </Text>
        <ToPar toPar={toPar} gray={true} />
      </View>
      <View style={style.cellBottom}>
        <Text
          style={{
            ...style.cellText,
            color,
            textDecorationLine,
          }}
        >
          {netScore}
        </Text>
        <ToPar toPar={netToPar} gray={highest} />
      </View>
    </View>
  );
};

const TotalCell = ({
  score,
  toPar,
  netScore,
  netToPar,
}: {
  score: number;
  toPar: number;
  netScore: number;
  netToPar: number;
}) => {
  return (
    <View style={{ ...style.cell, ...style.cellTotal }}>
      <View style={{ ...style.cellTop, ...style.cellTopTotal }}>
        <Text style={style.cellText}>{score}</Text>
        <ToPar toPar={toPar} gray={true} />
      </View>
      <View style={style.cellBottom}>
        <Text style={{ ...style.cellText, ...style.highlightText }}>
          {netScore}
        </Text>
        <ToPar toPar={netToPar} gray={false} />
      </View>
    </View>
  );
};

const StatCell = ({ stat }: { stat: number }) => {
  return (
    <View style={{ ...style.cell, ...style.cellStat }}>
      <Text style={{ ...style.cellText, ...style.highlightText }}>{stat}</Text>
    </View>
  );
};

export default LeaderboardScreen;

import { isNil } from "lodash";
import React from "react";
import { Text, View } from "react-native";

import { useAppConfig } from "@/contexts/AppConfigContext";
import Scorecard from "@/models/Scorecard";
import ScorecardPlayer from "@/models/ScorecardPlayer";
import HandicapBubbles from "@/components/HandicapBubbles";
import Score from "@/components/Score";
import ToPar from "@/components/ToPar";

import style from "./style";

const GroupScorecard = ({ scorecard }: { scorecard: Scorecard }) => {
  const { orientation } = useAppConfig();

  const fullScorecard = orientation === "horizontal";

  return (
    <View style={style.container}>
      <View style={style.table}>
        <HeaderRow scorecard={scorecard} fullScorecard={fullScorecard} />
        {fullScorecard && (
          <HandicapRow scorecard={scorecard} fullScorecard={fullScorecard} />
        )}
        <ParRow scorecard={scorecard} fullScorecard={fullScorecard} />
        {scorecard.players.map((player, index) => (
          <PlayerRow
            key={`player-${player.id}`}
            player={player}
            scorecard={scorecard}
            last={index < scorecard.players.length - 1}
            fullScorecard={fullScorecard}
          />
        ))}
        <TeamRow scorecard={scorecard} fullScorecard={fullScorecard} />
      </View>
    </View>
  );
};

const HeaderRow = ({
  scorecard,
  fullScorecard = false,
}: {
  scorecard: Scorecard;
  fullScorecard?: boolean;
}) => {
  return (
    <View style={{ ...style.row, ...style.headerRow }}>
      <View
        style={{
          ...style.cell,
          ...style.headerCell,
          ...style.cellName,
          ...style.headerCellName,
        }}
      >
        <Text style={style.headerCellText}>Hole</Text>
      </View>
      {fullScorecard &&
        scorecard.holes.slice(0, 9).map((hole) => (
          <View
            key={`hole-${hole.id}`}
            style={{
              ...style.cell,
              ...style.headerCell,
              ...style.scoreCell,
            }}
          >
            <Text style={style.headerCellText}>{hole.number}</Text>
          </View>
        ))}
      <View
        style={{
          ...style.cell,
          ...style.headerCell,
        }}
      >
        <Text style={style.headerCellText}>Front</Text>
      </View>
      {fullScorecard &&
        scorecard.holes.slice(9, 18).map((hole) => (
          <View
            key={`hole-${hole.id}`}
            style={{
              ...style.cell,
              ...style.headerCell,
              ...style.scoreCell,
            }}
          >
            <Text style={style.headerCellText}>{hole.number}</Text>
          </View>
        ))}
      <View
        style={{
          ...style.cell,
          ...style.headerCell,
        }}
      >
        <Text style={style.headerCellText}>Back</Text>
      </View>
      <View
        style={{
          ...style.cell,
          ...style.headerCell,
          ...style.lastCell,
        }}
      >
        <Text style={style.headerCellText}>Total</Text>
      </View>
    </View>
  );
};

const ParRow = ({
  scorecard,
  fullScorecard = false,
}: {
  scorecard: Scorecard;
  fullScorecard?: boolean;
}) => {
  return (
    <View style={{ ...style.row, ...style.parRow }}>
      <View
        style={{
          ...style.cell,
          ...style.cellName,
          ...style.parCell,
          ...style.parCellName,
        }}
      >
        <Text style={style.parCellText}>Par</Text>
      </View>
      {fullScorecard &&
        scorecard.holes.slice(0, 9).map((hole) => (
          <View
            key={`hole-${hole.id}`}
            style={{
              ...style.cell,
              ...style.parCell,
              ...style.scoreCell,
            }}
          >
            <Text style={style.parCellText}>{hole.par}</Text>
          </View>
        ))}
      <View
        style={{
          ...style.cell,
          ...style.parCell,
        }}
      >
        <Text style={style.parCellText}>{scorecard.frontPar()}</Text>
      </View>
      {fullScorecard &&
        scorecard.holes.slice(9, 18).map((hole) => (
          <View
            key={`hole-${hole.id}`}
            style={{
              ...style.cell,
              ...style.parCell,
              ...style.scoreCell,
            }}
          >
            <Text style={style.parCellText}>{hole.par}</Text>
          </View>
        ))}
      <View
        style={{
          ...style.cell,
          ...style.parCell,
        }}
      >
        <Text style={style.parCellText}>{scorecard.backPar()}</Text>
      </View>
      <View
        style={{
          ...style.cell,
          ...style.parCell,
          ...style.lastCell,
        }}
      >
        <Text style={style.parCellText}>{scorecard.totalPar()}</Text>
      </View>
    </View>
  );
};

const HandicapRow = ({
  scorecard,
  fullScorecard = false,
}: {
  scorecard: Scorecard;
  fullScorecard?: boolean;
}) => {
  return (
    <View style={{ ...style.row, ...style.handicapRow }}>
      <View
        style={{
          ...style.cell,
          ...style.cellName,
          ...style.handicapCell,
          ...style.handicapCellName,
        }}
      >
        <Text style={style.handicapCellText}>Handicap</Text>
      </View>
      {fullScorecard &&
        scorecard.holes.slice(0, 9).map((hole) => (
          <View
            key={`hole-${hole.id}`}
            style={{
              ...style.cell,
              ...style.handicapCell,
              ...style.scoreCell,
            }}
          >
            <Text style={style.handicapCellText}>{hole.handicap}</Text>
          </View>
        ))}
      <View
        style={{
          ...style.cell,
          ...style.handicapCell,
        }}
      />
      {fullScorecard &&
        scorecard.holes.slice(9, 18).map((hole) => (
          <View
            key={`hole-${hole.id}`}
            style={{
              ...style.cell,
              ...style.handicapCell,
              ...style.scoreCell,
            }}
          >
            <Text style={style.handicapCellText}>{hole.handicap}</Text>
          </View>
        ))}
      <View
        style={{
          ...style.cell,
          ...style.handicapCell,
        }}
      />
      <View
        style={{
          ...style.cell,
          ...style.handicapCell,
          ...style.lastCell,
        }}
      />
    </View>
  );
};

const PlayerRow = ({
  scorecard,
  player,
  last = false,
  fullScorecard = false,
}: {
  scorecard: Scorecard;
  player: ScorecardPlayer;
  last: boolean;
  fullScorecard?: boolean;
}) => {
  return (
    <View key={`scorecard-${player.id}`} style={style.row}>
      <View
        style={{
          ...style.cell,
          ...style.cellName,
          borderBottomWidth: last ? 1 : 0,
        }}
      >
        <Text
          style={{
            ...style.cellText,
            ...style.nameText,
          }}
        >
          {fullScorecard
            ? player.nickname
            : `${player.firstName} ${player.lastName}`}
        </Text>
        <Text style={style.handicap}>{player.handicap}</Text>
      </View>
      {fullScorecard &&
        scorecard.holes.slice(0, 9).map((hole) => {
          const score = player.round.scores.find((x) => x.holeId === hole.id);

          return (
            <View
              key={`player-score-${player.id}-hole-${hole.id}`}
              style={{ ...style.cell, ...style.scoreCell }}
            >
              <Score
                score={!isNil(score) ? score.score : undefined}
                par={hole.par}
              />
              <HandicapBubbles
                holeHandicap={hole.handicap}
                playerHandicap={player.handicap}
              />
            </View>
          );
        })}
      <View style={{ ...style.cell, ...style.totalCell }}>
        <Text style={style.cellText}>{player.round.frontScore}</Text>
        <ToPar toPar={player.round.frontToPar} gray={false} />
      </View>
      {fullScorecard &&
        scorecard.holes.slice(9, 18).map((hole) => {
          const score = player.round.scores.find((x) => x.holeId === hole.id);

          return (
            <View
              key={`player-score-${player.id}-hole-${hole.id}`}
              style={{ ...style.cell, ...style.scoreCell }}
            >
              <Score
                score={!isNil(score) ? score.score : undefined}
                par={hole.par}
              />
              <HandicapBubbles
                holeHandicap={hole.handicap}
                playerHandicap={player.handicap}
              />
            </View>
          );
        })}
      <View style={{ ...style.cell, ...style.totalCell }}>
        <Text style={style.cellText}>{player.round.backScore}</Text>
        <ToPar toPar={player.round.backToPar} gray={false} />
      </View>
      <View style={{ ...style.cell, ...style.totalCell, ...style.lastCell }}>
        <Text style={style.cellText}>{player.round.score}</Text>
        <ToPar toPar={player.round.toPar} gray={false} />
      </View>
    </View>
  );
};

const TeamRow = ({
  scorecard,
  fullScorecard = false,
}: {
  scorecard: Scorecard;
  fullScorecard: boolean;
}) => {
  return (
    <View style={{ ...style.row, ...style.teamRow }}>
      <View
        style={{
          ...style.cell,
          ...style.cellName,
          ...style.teamCell,
          ...style.teamCellName,
        }}
      />
      {fullScorecard &&
        scorecard.holes.slice(0, 9).map((hole, index) => (
          <View
            key={`hole-${hole.id}`}
            style={{
              ...style.cell,
              ...style.teamCell,
              ...style.scoreCell,
            }}
          >
            <ToPar
              toPar={scorecard.teamScore.netToPars[index]}
              marginLeft={0}
            />
          </View>
        ))}
      <View
        style={{
          ...style.cell,
          ...style.teamCell,
        }}
      >
        <ToPar toPar={scorecard.teamScore.frontNetToPar} marginLeft={0} />
      </View>
      {fullScorecard &&
        scorecard.holes.slice(9, 18).map((hole, index) => (
          <View
            key={`hole-${hole.id}`}
            style={{
              ...style.cell,
              ...style.teamCell,
              ...style.scoreCell,
            }}
          >
            <ToPar
              toPar={scorecard.teamScore.netToPars[index + 9]}
              marginLeft={0}
            />
          </View>
        ))}
      <View
        style={{
          ...style.cell,
          ...style.teamCell,
        }}
      >
        <ToPar toPar={scorecard.teamScore.backNetToPar} marginLeft={0} />
      </View>
      <View
        style={{
          ...style.cell,
          ...style.teamCell,
          ...style.lastCell,
        }}
      >
        <ToPar toPar={scorecard.teamScore.totalNetToPar} marginLeft={0} />
      </View>
    </View>
  );
};

export default GroupScorecard;

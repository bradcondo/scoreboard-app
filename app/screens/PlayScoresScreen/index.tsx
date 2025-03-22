import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {isNil} from 'lodash';

import Scorecard from '@models/Scorecard';
import Api from '@services/Api';
import {useAppConfig} from '@contexts/AppConfigContext';
import GroupScorecard from '@components/GroupScorecard';
import Hole from '@models/ScorecardHole';
import ToPar from '@components/ToPar';
import HandicapBubbles from '@components/HandicapBubbles';
import ScorecardPlayer from '@models/ScorecardPlayer';
import {StackParamList} from '@navigators/PlayNavigator';
import OutingRound from '@models/OutingRound';
import OutingGroup from '@models/OutingGroup';

import colors from '@styles/colors';
import style from './style';
import {useOuting} from '@contexts/OutingContext';

type NavigationType = StackNavigationProp<StackParamList, 'Scores'>;
type Route = RouteProp<StackParamList, 'Scores'>;
export interface Props {
  navigation: NavigationType;
  route: Route;
}

const ScoresScreen: React.FC<Props> = ({route}: Props) => {
  const outingRound = OutingRound.parse(route.params.outingRound);
  const outingGroup = OutingGroup.parse(route.params.outingGroup);

  const {outing} = useOuting();
  const {orientation} = useAppConfig();
  const [scorecard, setScorecard] = useState<Scorecard>();
  const [holeNumber, setHoleNumber] = useState<number>(1);
  const [hole, setHole] = useState<Hole>();
  const [pendingSave, setPendingSave] = useState<boolean>(false);

  useEffect(() => {
    if (!isNil(outing)) {
      Api.getScorecard(outingGroup.id).then((foundScorecard) =>
        setScorecard(foundScorecard),
      );
    }
  }, [outing, outingGroup.id]);

  useEffect(() => {
    if (!isNil(scorecard)) {
      const foundHole = scorecard.holes.find((x) => x.number === holeNumber);
      setHole(foundHole);
    }
  }, [scorecard, holeNumber]);

  if (isNil(hole) || isNil(scorecard)) {
    return null;
  }

  const setHoleNumberHandler = (newHoleNumber: number) => {
    if (!pendingSave) {
      setHoleNumber(newHoleNumber);
    }
  };

  const setScoreHandler = (playerId: number, holeId: number, score: number) => {
    if (!pendingSave) {
      setPendingSave(true);
      Api.updateScore(outingGroup.id, playerId, holeId, score)
        .then((updatedScorecard) => setScorecard(updatedScorecard))
        .finally(() => setPendingSave(false));
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.header}>
        {outingRound.course.name} @ {outingRound.when()}
      </Text>
      {orientation === 'vertical' && (
        <>
          <HoleHeader hole={hole} setHoleNumber={setHoleNumberHandler} />
          <ScrollView style={style.scroll}>
            <View style={style.table}>
              <HeaderRow />
              {scorecard.players.map((player, index) => (
                <PlayerRow
                  key={`player-${player.id}`}
                  player={player}
                  hole={hole}
                  last={index === scorecard.players.length - 1}
                  setScore={setScoreHandler}
                />
              ))}
              <TeamRow toPar={scorecard.teamScore.netToPars[hole.number - 1]} />
            </View>
          </ScrollView>
        </>
      )}
      {orientation === 'horizontal' && !isNil(scorecard) && (
        <ScrollView style={style.scroll}>
          <View>
            <GroupScorecard scorecard={scorecard} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const HoleHeader = ({
  hole,
  setHoleNumber,
}: {
  hole: Hole;
  setHoleNumber: (holeNumber: number) => void;
}) => {
  const previousHoleHandler = () => {
    setHoleNumber(hole.number > 1 ? hole.number - 1 : 18);
  };
  const nextHoleHandler = () => {
    setHoleNumber(hole.number < 18 ? hole.number + 1 : 1);
  };

  return (
    <View style={style.holeHeader}>
      <View style={style.previousHole}>
        <TouchableHighlight onPress={previousHoleHandler}>
          <Ionicons name={'chevron-back-circle'} size={36} color={colors.red} />
        </TouchableHighlight>
      </View>
      <Text style={style.holeHeaderText}>
        Hole {hole.number} - Par {hole.par}
      </Text>
      <Text style={style.holeMetaText}>
        {hole.yards} yards - Handicap: {hole.handicap}
      </Text>
      <View style={style.nextHole}>
        <TouchableHighlight onPress={nextHoleHandler}>
          <Ionicons
            name={'chevron-forward-circle'}
            size={36}
            color={colors.red}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const HeaderRow = () => {
  return (
    <View style={{...style.row, ...style.headerRow}}>
      <View
        style={{
          ...style.cell,
          ...style.headerCell,
          ...style.cellName,
          ...style.headerCellName,
        }}>
        <Text style={style.headerRowText}>Player</Text>
      </View>
      <View
        style={{
          ...style.cell,
          ...style.headerCell,
          ...style.strokesCell,
        }}>
        <Text style={style.headerRowText}>Strokes</Text>
      </View>
      <View
        style={{
          ...style.cell,
          ...style.headerCell,
        }}>
        <Text style={style.headerRowText}>Score</Text>
      </View>
      <View
        style={{
          ...style.cell,
          ...style.headerCell,
        }}>
        <Text style={style.headerRowText}>Net</Text>
      </View>
    </View>
  );
};

const PlayerRow = ({
  player,
  hole,
  last,
  setScore,
}: {
  player: ScorecardPlayer;
  hole: Hole;
  last: boolean;
  setScore: (playerId: number, holeId: number, score: number) => void;
}) => {
  const score = player.round.scores.find((x) => x.holeId === hole.id);

  const removeStrokeHandler = () => {
    const newScore = !isNil(score)
      ? score.score > 1
        ? score.score - 1
        : 1
      : hole.par;
    setScore(player.id, hole.id, newScore);
  };
  const addStrokeHandler = () => {
    const newScore = !isNil(score) ? score.score + 1 : hole.par;
    setScore(player.id, hole.id, newScore);
  };

  const borderBottomWidth = last ? 0 : 1;

  return (
    <View style={style.row}>
      <View
        style={{
          ...style.cell,
          ...style.cellName,
          borderBottomWidth,
        }}>
        <Text
          style={{
            ...style.cellText,
            ...style.nameText,
          }}>
          {player.nickname}
        </Text>
        <Text style={style.handicap}>{player.handicap}</Text>
      </View>
      <View style={{...style.cell, ...style.strokesCell}}>
        {!isNil(score) && (
          <>
            <TouchableHighlight onPress={removeStrokeHandler}>
              <Ionicons
                name={'remove-circle-outline'}
                size={36}
                color={colors.gray}
              />
            </TouchableHighlight>
            <Text style={{...style.cellText, ...style.strokesText}}>
              {score.score}
            </Text>
          </>
        )}
        <TouchableHighlight onPress={addStrokeHandler}>
          <Ionicons
            name={isNil(score) ? 'add-circle' : 'add-circle-outline'}
            size={36}
            color={colors.gray}
          />
        </TouchableHighlight>
      </View>
      <View style={style.cell}>
        <Text style={style.cellText}>{!isNil(score) ? score.score : null}</Text>
        <ToPar toPar={!isNil(score) ? score.toPar : undefined} gray={false} />
        <HandicapBubbles
          holeHandicap={hole.handicap}
          playerHandicap={player.handicap}
        />
      </View>
      <View style={style.cell}>
        <Text style={style.cellText}>
          {!isNil(score) ? score.netScore : null}
        </Text>
        <ToPar
          toPar={!isNil(score) ? score.netToPar : undefined}
          gray={false}
        />
      </View>
    </View>
  );
};

const TeamRow = ({toPar}: {toPar: number}) => {
  return (
    <View style={{...style.row, ...style.teamRow}}>
      <View
        style={{
          ...style.cell,
          ...style.teamCell,
          ...style.cellName,
          ...style.teamCellName,
        }}
      />
      <View
        style={{
          ...style.cell,
          ...style.teamCell,
          ...style.strokesCell,
        }}
      />
      <View
        style={{
          ...style.cell,
          ...style.teamCell,
        }}
      />
      <View
        style={{
          ...style.cell,
          ...style.teamCell,
        }}>
        <ToPar toPar={toPar} />
      </View>
    </View>
  );
};

export default ScoresScreen;

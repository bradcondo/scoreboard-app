import React, {useEffect} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {compact, isNil} from 'lodash';

import {useOuting} from '@contexts/OutingContext';
import {StackParamList} from '@navigators/PlayNavigator';
import OutingGroup from '@models/OutingGroup';
import OutingRound from '@models/OutingRound';

import style from './style';
import {useAppConfig} from '@contexts/AppConfigContext';

type NavigationType = StackNavigationProp<StackParamList, 'SelectGroup'>;
type Route = RouteProp<StackParamList, 'SelectGroup'>;
export interface Props {
  navigation: NavigationType;
  route: Route;
}

const SelectGroupScreen: React.FC<Props> = ({navigation, route}: Props) => {
  const {player} = useAppConfig();
  const {outingPlayers} = useOuting();
  const outingRound = OutingRound.parse(route.params.outingRound);

  const selectGroupHandler = (selectedOutingGroup: OutingGroup) => {
    navigation.navigate('Scores', {
      outingRound: outingRound.dump(),
      outingGroup: selectedOutingGroup.dump(),
    });
  };

  useEffect(() => {
    if (!isNil(player)) {
      const outingPlayer = outingPlayers.find((x) => x.playerId === player.id);
      if (!isNil(outingPlayer) && !outingPlayer.admin) {
        outingRound.groups.forEach((outingGroup) => {
          if (outingGroup.hasPlayer(player.id)) {
            selectGroupHandler(outingGroup);
          }
        });
      }
    }
  }, [player, outingPlayers, outingRound]);

  return (
    <View style={style.container}>
      <Text style={style.header}>Play: Select Group</Text>

      {outingRound.groups.map((x) => {
        return (
          <OutingGroupButton
            key={`outing-group-${x.id}`}
            outingGroup={x}
            selectGroupHandler={selectGroupHandler}
          />
        );
      })}
    </View>
  );
};

const OutingGroupButton = ({
  outingGroup,
  selectGroupHandler,
}: {
  outingGroup: OutingGroup;
  selectGroupHandler: (outingGroup: OutingGroup) => void;
}) => {
  const {outingPlayers} = useOuting();

  const players = compact(
    outingGroup.players.map((x) => {
      const foundPlayer = outingPlayers.find((y) => y.playerId === x.playerId);
      if (!isNil(foundPlayer)) {
        return foundPlayer.player;
      } else {
        return undefined;
      }
    }),
  );

  return (
    <TouchableHighlight
      style={style.button}
      onPress={() => selectGroupHandler(outingGroup)}>
      <Text style={style.buttonText}>
        {outingGroup.number} - {players.map((x) => x.nickname).join(', ')}
      </Text>
    </TouchableHighlight>
  );
};

export default SelectGroupScreen;

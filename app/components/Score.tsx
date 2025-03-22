import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import colors from '@styles/colors';
import {isNil} from 'lodash';

export interface Props {
  score: number | undefined;
  par: number | undefined;
}

const Score: React.FC<Props> = ({score, par}: Props) => {
  if (isNil(score) || isNil(par)) {
    return null;
  }

  if (score <= par - 2) {
    return (
      <View style={style.eagle}>
        <View style={[style.score, style.birdie]}>
          <Text style={style.scoreText}>{score}</Text>
        </View>
      </View>
    );
  } else if (score === par - 1) {
    return (
      <View style={[style.score, style.birdie]}>
        <Text style={style.scoreText}>{score}</Text>
      </View>
    );
  } else if (score === par + 1) {
    return (
      <View style={[style.score, style.bogey]}>
        <Text style={style.scoreText}>{score}</Text>
      </View>
    );
  } else if (score >= par + 2) {
    return (
      <View style={style.doubleBogey}>
        <View style={[style.score, style.bogey]}>
          <Text style={style.scoreText}>{score}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={style.score}>
      <Text style={style.scoreText}>{score}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  score: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: Platform.OS === 'android' ? 10 : 11,
    lineHeight: Platform.OS === 'android' ? 12 : 14,
    fontWeight: '400',
  },
  eagle: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 2,
    borderRadius: 16,
  },
  birdie: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 14,
  },
  bogey: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  doubleBogey: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 1,
  },
});

export default Score;

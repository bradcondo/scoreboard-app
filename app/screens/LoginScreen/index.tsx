import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {isNil} from 'lodash';

import {useAppConfig} from '@contexts/AppConfigContext';
import Api from '@services/Api';
import {StackParamList} from '@navigators/AppNavigator';

import style from './style';

type NavigationType = StackNavigationProp<StackParamList, 'Login'>;
export interface Props {
  navigation: NavigationType;
}

const LoginScreen: React.FC<Props> = ({navigation}: Props) => {
  const {player, setPlayer} = useAppConfig();
  const emailAddress = useRef<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!isNil(player)) {
      navigation.navigate('SelectOuting');
    }
  }, [navigation, player]);

  const buttonPressHandler = () => {
    if (!isNil(emailAddress.current)) {
      Api.getPlayer(emailAddress.current)
        .then((foundPlayer) => {
          setPlayer(foundPlayer);
        })
        .catch((e: Error) => {
          setError(e.message);
        });
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.header}>Email Address</Text>
      <TextInput
        style={style.input}
        keyboardType="email-address"
        onChangeText={(value) => (emailAddress.current = value)}
      />
      <TouchableHighlight style={style.button} onPress={buttonPressHandler}>
        <Text style={style.buttonText}>Go</Text>
      </TouchableHighlight>
      <Text style={style.error}>{error}</Text>
    </View>
  );
};

export default LoginScreen;

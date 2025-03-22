import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SkinsScreen from '@screens/SkinsScreen';
import {useOuting} from '@contexts/OutingContext';
import colors from '@styles/colors';
import layout from '@styles/layout';

export type StackParamList = {Skins: undefined};

const SkinsStack = createStackNavigator();

const SkinsNavigator = () => {
  const {outing, refreshOuting} = useOuting();

  return (
    <SkinsStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: outing?.name,
        headerRight: () => (
          <View style={layout.headerRight}>
            <Ionicons
              name="refresh-circle-outline"
              size={28}
              color={colors.darkGray}
              onPress={() => refreshOuting()}
            />
          </View>
        ),
      }}>
      <SkinsStack.Screen name="Skins" component={SkinsScreen} />
    </SkinsStack.Navigator>
  );
};

export default SkinsNavigator;

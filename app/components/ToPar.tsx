import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { isNil } from "lodash";

import colors from "@/styles/colors";

const ToPar = ({
  toPar,
  gray = false,
  marginLeft = 4,
}: {
  toPar: number | undefined;
  gray?: boolean;
  marginLeft?: number;
}) => {
  if (isNil(toPar)) {
    return null;
  }

  const color = gray
    ? colors.gray
    : toPar > 0
      ? colors.darkRed
      : toPar < 0
        ? colors.green
        : colors.gray;

  return (
    <View style={{ ...style.container, backgroundColor: color, marginLeft }}>
      <Text style={style.text}>{toPar === 0 ? "E" : toPar}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.darkRed,
    borderRadius: 5,
    paddingLeft: 4,
    paddingRight: 4,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.white,
  },
});

export default ToPar;

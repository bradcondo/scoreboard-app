import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "@/styles/colors";

export interface Props {
  playerHandicap: number;
  holeHandicap: number;
}

const HandicapBubbles: React.FC<Props> = ({
  playerHandicap,
  holeHandicap,
}: Props) => {
  var bubbles = 0;
  while (playerHandicap >= holeHandicap) {
    bubbles++;
    playerHandicap -= 18;
  }

  if (bubbles === 1) {
    return <View style={[style.bubble, style.bubble1]} />;
  }

  if (bubbles === 2) {
    return (
      <>
        <View style={[style.bubble, style.bubble1]} />
        <View style={[style.bubble, style.bubble2]} />
      </>
    );
  }

  return null;
};

const style = StyleSheet.create({
  bubble: {
    width: 4,
    height: 4,
    backgroundColor: colors.red,
    borderRadius: 4,
  },
  bubble1: {
    position: "absolute",
    top: 1,
    right: 1,
  },
  bubble2: {
    position: "absolute",
    top: 1,
    right: 7,
  },
});

export default HandicapBubbles;

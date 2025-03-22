import { StyleSheet } from "react-native";

import colors from "@/styles/colors";

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  table: {
    margin: 5,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 5,
  },
  row: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
    backgroundColor: colors.white,
    height: 54,
    flexDirection: "row",
  },
  headerRow: {
    backgroundColor: colors.darkRed,
    height: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerRowText: {
    fontWeight: "bold",
    color: colors.white,
  },
  cell: {
    borderRightWidth: 1,
    borderRightColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    position: "relative",
    flexDirection: "column",
  },
  cellTop: {
    width: "100%",
    height: 27,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
  },
  cellTopTotal: {
    borderBottomColor: colors.gray,
  },
  cellBottom: {
    width: "100%",
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  headerCell: {
    height: 30,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  cellText: {
    fontSize: 10,
    color: colors.darkGray,
  },
  nameText: {
    fontSize: 12,
    marginTop: 0,
  },
  highlightText: {
    color: colors.black,
    fontWeight: "700",
  },
  cellPosition: {
    width: 22,
  },
  cellName: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
    borderRightWidth: 1,
    borderRightColor: colors.gray,
  },
  headerCellName: {
    backgroundColor: colors.darkRed,
    borderRightColor: colors.black,
  },
  cellRound: {
    width: 50,
  },
  cellStat: {
    width: 25,
  },
  cellTotal: {
    width: 62,
    borderRightWidth: 0,
    backgroundColor: colors.lightGray,
    borderLeftWidth: 1,
    borderLeftColor: colors.gray,
  },
  headerCellTotal: {
    backgroundColor: colors.darkRed,
    borderLeftColor: colors.black,
  },
  position: {
    position: "absolute",
    top: 2,
    left: 3,
    color: colors.darkGray,
    fontSize: 8,
  },
  handicap: {
    position: "absolute",
    top: 2,
    right: 3,
    fontSize: 9,
    fontWeight: "400",
    color: colors.darkGray,
  },
});

export default style;

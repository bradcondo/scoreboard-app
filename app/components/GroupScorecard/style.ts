import {StyleSheet} from 'react-native';

import colors from '@styles/colors';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  table: {
    margin: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 5,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    backgroundColor: colors.transparent,
    height: 35,
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: colors.darkRed,
    height: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 0,
  },
  parRow: {
    backgroundColor: colors.darkGray,
    height: 24,
  },
  handicapRow: {
    backgroundColor: colors.gray,
    height: 18,
  },
  teamRow: {
    height: 24,
    backgroundColor: colors.lightGray,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  cell: {
    borderRightWidth: 1,
    borderRightColor: colors.lightGray,
    width: 60,
    height: 35,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCell: {
    height: 30,
    borderRightWidth: 1,
    borderRightColor: colors.black,
    borderLeftWidth: 0,
  },
  parCell: {
    height: 24,
    backgroundColor: colors.darkGray,
    borderRightWidth: 1,
    borderRightColor: colors.black,
  },
  handicapCell: {
    height: 18,
    backgroundColor: colors.gray,
    borderRightWidth: 1,
    borderRightColor: colors.darkGray,
  },
  totalCell: {
    borderRightWidth: 1,
    borderRightColor: colors.gray,
  },
  teamCell: {
    height: 24,
    borderRightColor: colors.gray,
    borderBottomWidth: 0,
  },
  scoreCell: {
    width: 27,
    position: 'relative',
  },
  cellText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '700',
  },
  headerCellText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 14,
  },
  parCellText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 11,
  },
  handicapCellText: {
    fontWeight: 'normal',
    color: colors.black,
    fontSize: 10,
  },
  nameText: {
    fontSize: 14,
    marginTop: 0,
  },
  teamCellText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cellName: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    borderRightWidth: 1,
    borderRightColor: colors.gray,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    position: 'relative',
  },
  headerCellName: {
    backgroundColor: colors.darkRed,
    borderRightColor: colors.black,
    borderTopLeftRadius: 5,
    borderBottomWidth: 0,
  },
  parCellName: {
    borderBottomWidth: 0,
  },
  handicapCellName: {
    borderBottomWidth: 0,
  },
  teamCellName: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 0,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  handicap: {
    position: 'absolute',
    top: 2,
    right: 3,
    fontSize: 9,
    fontWeight: '400',
    color: colors.darkGray,
  },
});

export default style;

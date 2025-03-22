import {StyleSheet} from 'react-native';
import colors from '@styles/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  holeHeader: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: 38,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousHole: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  nextHole: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  holeHeaderText: {
    fontSize: 20,
  },
  holeMetaText: {
    fontSize: 13,
  },
  table: {
    margin: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 5,
  },
  row: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    backgroundColor: colors.white,
    height: 50,
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: colors.darkRed,
    height: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerRowText: {
    fontWeight: 'bold',
    color: colors.white,
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
    width: 50,
    height: 50,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCell: {
    height: 30,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  strokesCell: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamCell: {
    height: 24,
    borderRightColor: colors.gray,
    borderBottomWidth: 0,
  },
  // scoreDown: {
  //   position: 'absolute',
  //   top: 5,
  //   left: 8,
  // },
  // scoreUp: {
  //   position: 'absolute',
  //   top: 5,
  //   right: 8,
  // },
  cellText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '700',
  },
  strokesText: {
    width: 25,
    textAlign: 'center',
    fontSize: 16,
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
  },
  headerCellName: {
    backgroundColor: colors.darkRed,
    borderRightColor: colors.black,
    borderTopLeftRadius: 5,
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

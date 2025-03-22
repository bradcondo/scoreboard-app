import {StyleSheet} from 'react-native';
import colors from '@styles/colors';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
    height: 35,
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
  cell: {
    borderRightWidth: 1,
    borderRightColor: colors.lightGray,
    width: 50,
    height: 35,
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
  cellText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '700',
  },
  nameText: {
    fontSize: 14,
    marginTop: 0,
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
});

export default style;

import colors from '@styles/colors';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  header: {fontSize: 14, fontWeight: '300'},
  input: {
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    textAlign: 'center',
    padding: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  button: {
    backgroundColor: colors.darkRed,
    borderRadius: 4,
    padding: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  buttonText: {color: colors.white, fontSize: 12, fontWeight: 'bold'},
  error: {color: colors.red, fontWeight: 'bold', marginTop: 30},
});

export default style;

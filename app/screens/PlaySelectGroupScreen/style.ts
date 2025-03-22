import {StyleSheet} from 'react-native';
import colors from '@styles/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  header: {fontSize: 16, fontWeight: 'bold', textAlign: 'center'},
  button: {
    backgroundColor: colors.darkRed,
    borderRadius: 4,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 6,
  },
  buttonText: {color: colors.white, fontSize: 16, fontWeight: 'bold'},
});

export default style;

import {StyleSheet} from 'react-native';
import colors from '@styles/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  header2: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
    marginLeft: 5,
  },
  button: {
    backgroundColor: colors.darkRed,
    borderRadius: 4,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 6,
  },
  buttonText: {color: colors.white, fontSize: 16, fontWeight: 'bold'},
  scrollContainer: {width: '100%'},
});

export default style;

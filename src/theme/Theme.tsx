import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  formContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    flex: 1,
    height: 600,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  label: {
    marginTop: 25,
    color: '#FFFFFF',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#620e5d',
    borderRadius: 5,
    paddingHorizontal: 50,
  },
  errorTxt: {
    color: 'red',
    margin: 0,
  },
  backToLogin: {
    position: 'absolute',
    top: 30,
    paddingHorizontal: 17,
    paddingVertical: 7,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 2
  },
  loader: {
    position:'absolute',
    top: 5,
    right: 30,
  },
  info: {
    fontSize: 20,
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    borderRadius: 10
  },
  loaderView: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
  }
});

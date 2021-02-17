import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  cover: {
    height: 225,
  },
  modalContainer: {
    padding: 15,
  },
  modalItem: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4a89dc',
    borderColor: '#0f2a4e',
    borderWidth: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  modalItemText: {
    color: '#fff',
  },
});

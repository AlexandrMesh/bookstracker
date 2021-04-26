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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  modalItem: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0f2a4e',
    borderColor: '#4a89dc',
    borderWidth: 3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
  },
  active: {
    backgroundColor: 'green',
  },
  modalItemText: {
    height: '100%',
    color: '#fff',
    fontSize: 21,
    textAlignVertical: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButton: {
    width: '30%',
    marginLeft: 10,
    marginRight: 10,
  },
  spinner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 5,
    elevation: 5,
  },
  selectCategory: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  filters: {
    backgroundColor: '#fff',
    height: '50%',
  },
});

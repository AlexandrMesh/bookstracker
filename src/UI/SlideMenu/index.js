import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SlideMenu = ({ isVisible, onClose, onReset, children, title, resetTitle }) => (
  <>
    {isVisible && <View style={{ backgroundColor: 'black', opacity: 0.5, height: '100%', width: '100%', position: 'absolute', elevation: 5 }} />}
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <View style={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
        <Pressable onPress={onClose} style={{ height: '100%', width: '100%', position: 'absolute', elevation: 5 }} />
        <View style={{ backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 40,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
              {resetTitle ? (
                <Pressable onPress={onReset} style={{ marginLeft: 10 }}>
                  <Text>{resetTitle}</Text>
                </Pressable>
              ) : null}
            </View>
            <Pressable onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  </>
);

SlideMenu.defaultProps = {
  isVisible: false,
};

SlideMenu.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  resetTitle: PropTypes.string.isRequired,
};

export default SlideMenu;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, View, Pressable } from 'react-native';

const SlideMenu = ({ children }) => {
  const [isAreaVisible, setIsAreaVisible] = useState(false);

  return (
    <>
      <Button title="Show" onPress={() => setIsAreaVisible(true)} />
      <Button title="Hide" onPress={() => setIsAreaVisible(false)} />
      {isAreaVisible && (
        <View style={{ backgroundColor: 'black', opacity: 0.5, height: '100%', width: '100%', position: 'absolute', elevation: 5 }} />
      )}
      <Modal animationType="slide" transparent visible={isAreaVisible} onRequestClose={() => setIsAreaVisible(false)}>
        <View style={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
          <Pressable onPress={() => setIsAreaVisible(false)} style={{ height: '100%', width: '100%', position: 'absolute', elevation: 5 }} />
          <View style={{ backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5, paddingTop: 15 }}>{children}</View>
        </View>
      </Modal>
    </>
  );
};

SlideMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SlideMenu;

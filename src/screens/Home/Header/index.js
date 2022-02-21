import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.leftPane}>
        <View style={styles.logo}>
          <Text>Логотип</Text>
        </View>
      </View>
      <View style={styles.rightPane}>
        <Pressable onPress={() => navigation.navigate('Search')} style={styles.search}>
          <Text>Поиск</Text>
        </Pressable>
        <View style={styles.logo}>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Text>Аватар</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Header;

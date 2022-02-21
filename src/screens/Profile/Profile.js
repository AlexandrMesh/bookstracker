import React, { useEffect } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Profile = ({ email, signOut }) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text>{email}</Text>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate('About')}>
          <Text>О приложении</Text>
        </Pressable>
        <Button title="Signout" onPress={signOut} />
      </View>
    </View>
  );
};

Profile.propTypes = {
  email: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Profile;

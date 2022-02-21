import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

const About = ({ appVersion, supportEmail }) => {
  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.about}>
        <Text>App Name</Text>
        <Text>Description</Text>
        <Text>
          Feedback:
          {supportEmail}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text>
          Version:
          {appVersion}
        </Text>
      </View>
    </View>
  );
};

About.propTypes = {
  appVersion: PropTypes.string.isRequired,
  supportEmail: PropTypes.string.isRequired,
};

export default About;

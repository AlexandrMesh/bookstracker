import React from 'react';
import {View, Text, Button} from 'react-native';

const Books = ({navigation}) => {
  return (
    <View>
      <Text>Book screen</Text>
      <Button
        title="Go to read"
        onPress={() => navigation.navigate('ToRead')}
      />
    </View>
  );
};

export default Books;

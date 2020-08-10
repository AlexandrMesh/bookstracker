import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../redux/actions/dataActions';

const Books = ({ navigation, data }) => {
  useEffect(() => {
    getData({ page: 1 });
  }, []);

  const renderItem = ({ item }) => <Text>{item.title}</Text>;
  return (
    <View>
      <Text>Book screen</Text>
      <Button title="Go to read" onPress={() => navigation.navigate('ToRead')} />
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} />
    </View>
  );
};

Books.propTypes = {
  data: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);

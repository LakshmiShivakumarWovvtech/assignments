/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Body, Button, Card, Container, Content} from 'native-base';

const Details = (props) => {
  const data = props.route.params.result;
  return (
    <View>
      <Card>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Name: {''}</Text>
          <Text>{data.name}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Nasa_jpl_url: {''}</Text>
          <Text>{data.nasa_jpl_url}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>
            is_potentially_hazardous_asteroid: {''}
          </Text>
          <Text>{data.is_potentially_hazardous_asteroid.toString()}</Text>
        </View>
      </Card>
    </View>
  );
};
export default Details;

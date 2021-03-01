/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content} from 'native-base';

const NasaDetails = (props) => {
  const data = props.route.params.result;
  console.log('data data', data.is_potentially_hazardous_asteroid);
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Name:</Text>
                <Text>{data.name}</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Nasa_jpl_url:</Text>
                <Text>{data.nasa_jpl_url}</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>
                  Is_potentially_hazardous_asteroid:{' '}
                </Text>
                <Text>{data.is_potentially_hazardous_asteroid.toString()}</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
export default NasaDetails;

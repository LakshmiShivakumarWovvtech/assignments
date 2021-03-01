import {Body, Card, CardItem} from 'native-base';
import React from 'react';
import {View, Text} from 'react-native';

const NewsDetails = (props) => {
  const data = props.route.params.data;
  return (
    <View>
      <Card>
        <CardItem>
          <Body>
            <Text>{JSON.stringify(data)}</Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};
export default NewsDetails;

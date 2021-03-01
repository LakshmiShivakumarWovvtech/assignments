/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {Container, Content, Input, Item, Button, Text} from 'native-base';
import React, {useState} from 'react';

const CountryWeather = ({navigation}) => {
  const [contryname, setCountryName] = useState();
  const [input, setInput] = useState();

  const submitContryName = async () => {
    try {
      const response = await axios.get(
        ` https://restcountries.eu/rest/v2/name/${input}`,
      );
      setCountryName(response.data);
      navigation.navigate('Details', {
        result: response.data,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChange = (event) => {
    setInput(event);
  };

  return (
    <Container>
      <Content>
        <Item
          rounded
          style={{
            marginHorizontal: 110,
            marginLeft: 80,
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Input
            onChangeText={handleChange}
            placeholder="Enter Country Details"
          />
        </Item>
        <Button
          rounded
          onPress={() => submitContryName()}
          disabled={!input ? true : false}
          style={{
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 90,
            marginTop: 20,
          }}>
          <Text>SUBMIT</Text>
        </Button>
      </Content>
    </Container>
  );
};
export default CountryWeather;

/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import axios from 'axios';
import {
  Button,
  Container,
  Content,
  Input,
  Item,
  List,
  ListItem,
  Spinner,
} from 'native-base';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const Nasatest = ({navigation}) => {
  const [astroidId, setAstroId] = useState([]);
  const [astroidDetails, setAstroDetails] = useState();
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(false);
  const [errorms, setErrorms] = useState();

  const getAstroidId = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=nUfYg5yZvl0L8dh7mbhxo5ngLk7rzGzkmUSigjJr',
      );
      setAstroId(response.data.near_earth_objects);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const error = () => {
    return <Text>Please Enter Valid Numbers</Text>;
  };
  const getAstroidDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${input}?api_key=nUfYg5yZvl0L8dh7mbhxo5ngLk7rzGzkmUSigjJr`,
      );
      setAstroDetails(response.data);
      navigation.navigate('NasaDetails', {
        result: response.data,
      });
    } catch (e) {
      console.log('error', e);
      error();
    }
  };

  const handleChange = (event) => {
    setInput(event);
  };

  return (
    <Container>
      <Content>
        <Item
          regular
          style={{
            marginBottom: 20,
            marginHorizontal: 30,
            marginVertical: 20,
            marginLeft: 30,
          }}>
          <Input
            placeholder="Enter Astroid Id"
            onChangeText={handleChange}
            value={input}
          />
        </Item>
        <Button
          block
          style={{marginHorizontal: 30, marginBottom: 20}}
          onPress={() => getAstroidDetails()}
          disabled={!input ? true : false}>
          <Text>SUBMIT</Text>
        </Button>
        <Button
          block
          style={{
            marginHorizontal: 30,
            marginBottom: 20,
            color: 'white',
          }}
          onPress={() => getAstroidId()}>
          <Text>RANDOM ASTROID ID</Text>
        </Button>
        {loading ? (
          <Spinner />
        ) : (
          <SafeAreaView>
            <ScrollView>
              {astroidId &&
                astroidId.map((item) => {
                  return (
                    <View key={item.id}>
                      <List>
                        <ListItem>
                          <TouchableOpacity
                            onPress={() => {
                              setInput(item.id);
                              getAstroidDetails();
                            }}>
                            <Text>{item.id}</Text>
                          </TouchableOpacity>
                        </ListItem>
                      </List>
                    </View>
                  );
                })}
            </ScrollView>
          </SafeAreaView>
        )}
      </Content>
    </Container>
  );
};
export default Nasatest;

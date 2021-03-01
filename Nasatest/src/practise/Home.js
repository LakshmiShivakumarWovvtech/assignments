/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
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
import {useState} from 'react/cjs/react.development';
import axios from 'axios';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  const [astroid, setAstroid] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState();
  const [details, setDetails] = useState();

  const getAstroidId = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=nUfYg5yZvl0L8dh7mbhxo5ngLk7rzGzkmUSigjJr',
      );
      setAstroid(response.data.near_earth_objects);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getDeatils = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${input}?api_key=nUfYg5yZvl0L8dh7mbhxo5ngLk7rzGzkmUSigjJr`,
      );
      setDetails(response.data);
      navigation.navigate('Details', {
        result: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    setInput(event);
  };

  return (
    <Container style={{padding: 15}}>
      <Content>
        <Item
          regular
          style={{marginBottom: 20, marginHorizontal: 20, marginLeft: 20}}>
          <Input
            placeholder="Enter Astroid id"
            onChangeText={handleChange}
            value={input}
          />
        </Item>
        <Button
          block
          style={{marginHorizontal: 20, marginBottom: 10, color: '#fff'}}
          onPress={() => getDeatils()}
          disabled={!input ? true : false}>
          <Text>Submit</Text>
        </Button>
        <Button
          block
          style={{marginHorizontal: 20, marginBottom: 10, color: '#fff'}}
          onPress={() => getAstroidId()}>
          <Text>Random Astroid Id</Text>
        </Button>
        <View>
          {loading ? (
            <Spinner />
          ) : (
            <Container>
              <SafeAreaView>
                <ScrollView>
                  {astroid &&
                    astroid.map((item) => {
                      return (
                        <View key={item.id}>
                          <List>
                            <ListItem>
                              <TouchableOpacity
                                onPress={() => {
                                  setInput(item.id);
                                  getDeatils();
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
            </Container>
          )}
        </View>
      </Content>
    </Container>
  );
};
export default Home;

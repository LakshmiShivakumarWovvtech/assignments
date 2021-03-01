/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {Card, CardItem, Container, Content, View, Button} from 'native-base';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SvgUri} from 'react-native-svg';

const CountryDetails = (props) => {
  const data = props.route.params.result;

  const [CapitalName, setCapitalName] = useState();

  const submitCapitalName = async (item) => {
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=4af3a27d0fa68425aef7d2bd748ddf21&QUERY=${item}`,
      );
      setCapitalName(response.data);
      props.navigation.navigate('CapitalWeather', {
        result: response.data,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <Container>
      <Content>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Card>
              <CardItem>
                <View>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>Name:</Text>
                    <Text>{item.name}</Text>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>Capital:</Text>
                    <Text>{item.capital}</Text>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>Populaton:</Text>
                    <Text>{item.population}</Text>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>latlng:</Text>
                    <Text>{item.latlng}</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginTop: 10,
                    }}>
                    <SvgUri width="100" height="80" uri={item.flag} />
                    <Button
                      onPress={() => submitCapitalName(item.capital)}
                      style={{
                        marginLeft: 80,
                        width: 150,
                        alignContent: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginTop: 10,
                      }}>
                      <Text>Captital weather</Text>
                    </Button>
                  </View>
                </View>
              </CardItem>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
};
export default CountryDetails;

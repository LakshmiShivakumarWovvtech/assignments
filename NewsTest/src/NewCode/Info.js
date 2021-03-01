import {Card, View, Text} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

class Info extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const jsonContent = this.props.route.params.jsonData;
    return (
      <View style={styles.container}>
        <Card style={styles.cardStyle}>
          <Text style={styles.text}>{JSON.stringify(jsonContent)}</Text>
        </Card>
      </View>
    );
  }
}
export default Info;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  cardStyle: {
    padding: 15,
  },
  text: {
    fontSize: 16,
  },
});

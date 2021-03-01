/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import {Button} from 'native-base';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
const viewportWidth = Dimensions.get('window').width;
const viewportHeight = Dimensions.get('window').height;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      newsData: [],
      page: 0,
      EndReached: true,
      searchText: '',
      showFilter: false,
      search: false,
      //searchData:[]
    };
  }
  componentDidMount() {
    this.setState({isloading: true});
    this.getData();
    console.log(this.state.searchText, 'this.state.searchText ');
    setInterval(() => {
      this.getData();
    }, 10000);
  }

  searchfilter = (text) => {
    this.setState({EndReached: false});
    let searchData = this.state.newsData.filter((ele) => {
      return (
        ele.author.toLowerCase().includes(text.toLowerCase()) ||
        ele.title.toLowerCase().includes(text.toLowerCase())
        //  ele.url.toLowerCase().includes(text.toLowerCase())
      );
    });
    this.setState({newsData: searchData, search: true});
    if (!text) {
      alert('Data Not Found');
    }
  };

  getData() {
    return fetch(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' +
        this.state.page,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({newsData: responseJson.hits});
        this.setState({isloading: false});
      })
      .catch((error) => {
        console.log(error);
        this.data();
      });
  }

  data() {
    return (
      <View>
        <Text>Not Found</Text>
      </View>
    );
  }

  changeText = (text) => {
    this.setState({searchText: text});
    // alert(this.state.searchText.length);
    if (this.state.searchText == ' ') {
      this.setState({newsData: this.state.newsData});
    }
  };

  filterBy() {
    this.setState({showFilter: !this.state.showFilter});
  }

  searchbyDate = () => {
    var sorted = this.state.newsData;
    sorted.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
    this.setState({newsData: sorted});
  };

  searchbyTitle = () => {
    var sorted = this.state.newsData;
    sorted.sort((a, b) => (a.title > b.title ? 1 : -1));
    this.setState({newsData: sorted});
  };

  updateData() {
    let pageUpdate = this.state.page + 1;
    console.log(this.state.page);
    this.setState({page: pageUpdate});
    return fetch(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' +
        pageUpdate,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          newsData: [...this.state.newsData, ...responseJson.hits],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  navigateToInfo(item) {
    this.props.navigation.navigate('Info', {jsonData: item});
  }

  renderItem(data) {
    return (
      <TouchableOpacity
        style={styles.listBox}
        onPress={() => this.navigateToInfo(data.item)}>
        <Text style={styles.title}>{data.item.title}</Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoTextTitle}>URL:</Text> {data.item.url}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoTextTitle}>Created_at:</Text>{' '}
          {data.item.created_at}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoTextTitle}>Author:</Text> {data.item.author}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.data()} */}
        <View>
          <TextInput
            onChangeText={(text) => this.changeText(text)}
            placeholder="search by author or title"
            value={this.state.searchText}
            style={styles.textBox}
          />
          <Button
            block
            disabled={this.state.searchText == '' ? true : false}
            onPress={() => this.searchfilter(this.state.searchText)}>
            <Text style={styles.textButton}>Submit</Text>
          </Button>
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              marginVertical: 10,
            }}>
            <Button block style={{height: 38}} onPress={() => this.filterBy()}>
              <Text style={styles.textButton}>Filter</Text>
            </Button>
            {this.state.showFilter && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Button
                  light
                  block
                  style={{width: '48%', height: 38}}
                  onPress={() => this.searchbyDate()}>
                  <Text style={styles.textButtonFilter}>Created_at</Text>
                </Button>
                <View style={{padding: 5}} />
                <Button
                  light
                  block
                  style={{width: '48%', height: 38}}
                  onPress={() => this.searchbyTitle()}>
                  <Text style={styles.textButtonFilter}>Title</Text>
                </Button>
              </View>
            )}
          </View>
        </View>
        {this.state.isloading && (
          <ActivityIndicator size={'large'} color="#000"></ActivityIndicator>
        )}
        <View
          style={[
            styles.listContainer,
            this.state.showFilter ? styles.heightShow : styles.heightRemove,
          ]}>
          <FlatList
            data={this.state.newsData}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(index, id) => id.toString()}
            onEndReachedThreshold={0.03}
            onEndReached={
              this.state.EndReached ? () => this.updateData() : null
            }
          />
        </View>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  listBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: '#444',
    fontWeight: 'bold',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    margin: 3,
    paddingBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    margin: 5,
  },
  infoTextTitle: {
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 5,
  },
  heightShow: {
    height: viewportHeight - 340,
  },
  heightRemove: {
    height: viewportHeight - 280,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textButtonFilter: {
    fontSize: 16,
    //fontWeight:'bold'
  },
  textBox: {
    marginBottom: 10,
  },
});

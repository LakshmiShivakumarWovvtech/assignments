/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {Button, Text} from 'native-base';

const viewportHeight = Dimensions.get('window').height;

class NewHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      isloading: false,
      searchText: '',
      showFilter: false,
      search: false,
      page: 0,
      endReached: true,
    };
  }

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
        <Text>No Data Found</Text>
      </View>
    );
  }

  componentDidMount() {
    this.setState({isloading: true});
    this.getData();
    setInterval(() => {
      this.getData();
    }, 10000);
  }

  changeText = (text) => {
    this.setState({searchText: text});
    if (this.state.searchText === '') {
      this.setState({newsData: this.state.newsData});
    }
  };

  searchFilterData = (text) => {
    this.setState({endReached: false});
    let searchData = this.state.newsData.filter((ele) => {
      return (
        ele.author.toLowerCase().includes(text.toLowerCase()) ||
        ele.title.toLowerCase().includes(text.toLowerCase())
      );
    });
    this.setState({newsData: searchData});
  };

  filterBy() {
    this.setState({showFilter: !this.state.showFilter});
  }

  searchByDate = () => {
    var sorted = this.state.newsData;
    sorted.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
    this.setState({newsData: sorted});
  };
  searchByTitle = () => {
    var sorted = this.state.newsData;
    sorted.sort((a, b) => (a.title > b.title ? 1 : -1));
    this.setState({newsData: sorted});
  };

  updateData() {
    let pageUpdate = this.state.page + 1;
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
        <Text style={styles.textInfo}>
          <Text style={styles.textInfoTitle}>Url:</Text>
          {data.item.url}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.textInfoTitle}>Created_at:</Text>
          {data.item.created_at}
        </Text>
        <Text style={styles.textInfo}>
          <Text style={styles.textInfoTitle}>author:</Text>
          {data.item.author}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="search by author or title"
            onChangeText={(text) => this.changeText(text)}
            value={this.state.searchText}
            style={styles.textBox}
          />
          <Button
            block
            disabled={this.state.searchText === '' ? true : false}
            onPress={() => this.searchFilterData(this.state.searchText)}>
            <Text style={styles.textButton}>Search</Text>
          </Button>
          <View
            style={{
              padding: 10,
              borderColor: '#ccc',
              borderWidth: 1,
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
                  onPress={() => this.searchByDate()}>
                  <Text style={styles.textButtonFilter}>Create_at</Text>
                </Button>
                <Button
                  light
                  block
                  style={{width: '48%', height: 38}}
                  onPress={() => this.searchByTitle()}>
                  <Text>Title</Text>
                </Button>
              </View>
            )}
          </View>
          {this.state.isloading && (
            <ActivityIndicator size="large" color="#000" />
          )}
          <View
            style={[
              styles.listContainer,
              this.state.showFilter ? styles.hightShow : styles.hightRemove,
            ]}>
            <FlatList
              data={this.state.newsData}
              keyExtractor={(id) => id.toString()}
              renderItem={(item) => this.renderItem(item)}
              onEndReachedThreshold={0.03}
              onEndReached={
                this.state.endReached ? () => this.updateData() : null
              }
            />
          </View>
        </View>
      </View>
    );
  }
}
export default NewHome;

const styles = StyleSheet.create({
  textBox: {
    marginBottom: 10,
  },
  container: {
    padding: 20,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  textButtonFilter: {
    fontSize: 16,
  },
  listBox: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    margin: 3,
    paddingBottom: 10,
  },
  textInfo: {
    margin: 5,
    fontSize: 16,
    color: '#000',
  },
  textInfoTitle: {
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 5,
  },
  hightRemove: {
    height: viewportHeight - 280,
  },
  hightShow: {
    height: viewportHeight - 340,
  },
});

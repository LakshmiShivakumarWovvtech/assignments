/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Input,
  Item,
} from 'native-base';
import React, {Component, useState} from 'react';
import {useEffect} from 'react';
import {View, Text, ActivityIndicator, FlatList,
  ScrollView,
  TouchableOpacity} from 'react-native';


class NewsTest extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      news: '',
      page: 0,
      loading: true,
      searchData: true,
      filterData: true,
      date: true,
    };
  }

  apiData() {
    const {page, dataSource} = this.state;
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource:
            page === 1
              ? responseJson.hits
              : [...dataSource, ...responseJson.hits],
        });
        console.log('response', responseJson);
      });
  }

  indicator() {
    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.apiData();
    }, 1000);
  }
  componentWillUnount() {
    clearInterval(this.interval());
  }
  handleRefresh=() =>{
    this.setState(
      {
        loading: true,
      },
      () => {
        this.apiData();
      },
    );
  }

  handleLoadMore() {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.apiData();
      },
    );
  }

  renderItem(data) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Info', {data: data})}>
          <Card>
            <CardItem bordered>
              <Text>{data.item.title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <View>
                  <Text>Url:</Text>
                  <Text>{data.item.url}</Text>
                </View>
                <View>
                  <Text>Created_at:</Text>
                  <Text>{data.item.created_at}</Text>
                </View>
                <View>
                  <Text>Author:</Text>
                  <Text>{data.item.author}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
  search() {
    const data = this.state.dataSource;

            for (let i = 0; i < data.length; i++){
              if (data[i].url !== null && data[i].url !== undefined && data[i].url !== ''){
                if (data[i].author.includes(this.state.news.toLowerCase())  || data[i].title.includes(this.state.news)
                                || data[i].url.includes(this.state.news)
                            )

                    {return (
                        <View>
                        <View  style={{width:'98%',height:'auto',borderWidth:0.1,padding:10,elevation:5,marginTop:20}}>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>created_at:-</Text>
                        <Text style={{fontSize:12,padding:10}}>{data[i].created_at}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>url:-</Text>
                            <Text style={{fontSize:12,padding:10}}>{data[i].url}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>title:-</Text>
                            <Text style={{fontSize:12,padding:10}}>{data[i].title}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>author:-</Text>
                            <Text style={{fontSize:12,padding:10}}>{data[i].author}</Text>
                            </View>
                            </View>
                        </View>
                    );}
            }}
  }
  filterByDate() {
    const data = this.state.dataSource;
    data.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1);
    {
      return (
        <View>
          <ScrollView>
            {data.map((records) =>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Info', {data: records})
                }>
                <Card>
                  <CardItem bordered>
                    <Text>{records.title}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <View>
                        <Text>Url:</Text>
                        <Text>{records.url}</Text>
                      </View>
                      <View>
                        <Text>Created_at:</Text>
                        <Text>{records.created_at}</Text>
                      </View>
                      <View>
                        <Text>Author:</Text>
                        <Text>{records.author}</Text>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      );
    }
  }
  filterByTitle() {
    const data = this.state.dataSource;
    data.sort((a, b) =>
     ( a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1,
    );

    {
      return (
        <View>
          <ScrollView>
            {data.map((records) =>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Info', {data: records})
                }>
                <Card>
                  <CardItem bordered>
                    <Text>{records.title}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <View>
                        <Text>Url:</Text>
                        <Text>{records.url}</Text>
                      </View>
                      <View>
                        <Text>Created_at:</Text>
                        <Text>{records.created_at}</Text>
                      </View>
                      <View>
                        <Text>Author:</Text>
                        <Text>{records.author}</Text>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
           )}
          </ScrollView>
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        <View>
          <Item
            regular
            style={{
              marginHorizontal: 30,
              marginLeft: 30,
              marginBottom: 20,
              marginTop: 20,
            }}>
            <Input placeholder="Title, Author and Date" onChangeText={news => this.setState({news})} value={this.state.news}/>
          </Item>
          <Button
            block
            onPress={() => this.setState({searchData: false, filterdata: true})}
            style={{
              alignItem: 'center',
              marginBottom: 20,
              marginHorizontal: 30,
            }}>
            <Text>Search</Text>
          </Button>
          <Button
            block
            onPress={() =>
              this.setState({searchData: false, filterdata: false, date: true})
            }
            style={{marginBottom: 20, marginHorizontal: 30}}>
            <Text>Filter by Created_at</Text>
          </Button>
          <Button
            block
            onPress={() =>
              this.setState({searchData: false, filterdata: false, date: false})
            }
            style={{marginBottom: 20, marginHorizontal: 30}}>
            <Text>Filter by Title</Text>
          </Button>
        </View>
        <View>
          {this.state.searchData ?
            <FlatList
              data={this.state.dataSource}
              keyExtractor={(item) => item.id}
              renderItem={(item) => this.renderItem(item)}
              onRefresh={this.handleRefresh}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
              refreshing={this.state.loading}
              ListFooterComponent={this.indicator()}
            />
           :
           this.state.filterdata ?
            this.search()
          :
          this.state.date ?
            this.filterByDate()
         :
            this.filterByTitle()
          }
        </View>
      </View>
    );
  }
}
export default NewsTest;

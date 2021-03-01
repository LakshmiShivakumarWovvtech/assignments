/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { TextInput ,View,Text,TouchableOpacity,FlatList, ActivityIndicator,ScrollView} from 'react-native';
import { Container, Header, Content, Button, Card, CardItem, Body} from 'native-base';

export default class News extends Component{
    constructor(){
        super();
        this.state = {
            news:'',
            dataSource:[],
            page:0,
            loading:true,
            searchData:true,
            filterData:true,
            // eslint-disable-next-line no-trailing-spaces
            date:true,

        };
    }
        ApiCall(){
        const { page,dataSource} = this.state;
        //fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}")
     fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: page === 1 ? responseJson.hits : [...dataSource, ...responseJson.hits],
          });
          console.log('responseJson',JSON.stringify(responseJson));
        })
        .catch(error=>console.log(error)); //to catch the errors if any
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.ApiCall();
        }, 1000);
        }
       componentWillUnmount() {
        clearInterval(this.interval);
      }
        handleRefresh = () => {
            this.setState({
                loading: true,
            }, () =>{
                this.ApiCall();
            });
        }

        handleLoadMore = () => {
            this.setState({
                page: this.state.page + 1,
            }, () =>{
                this.ApiCall();
            });
        }

        indicator(){
            return (
                <View
                style={{
                    paddingVertical: 30,
                    // borderTopWidth: 1,
                    // borderColor: "#00ff00"
                }}
            >
            <ActivityIndicator size="large" color="#00ff00" />

               {/* <ActivityIndicator  size="large" animating={this.state.loading} /> */}
            </View>
            );

        }

        search(){
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

        renderItem(data){
            console.log('data==>',JSON.stringify(data));
            return (
                <View >
                <TouchableOpacity

                onPress={()=>this.props.navigation.navigate('Info',{data:data})}
               >
                    <Card>
                        <CardItem bordered>


                <Text >{data.item.title}</Text>

                </CardItem>
                <CardItem>
                    <Body>

                <Text style={{fontWeight:'bold',padding:5}}>Url:-</Text>
                <Text style={{fontSize:12}}>{data.item.url}</Text>


                <Text style={{fontWeight:'bold',padding:5}}>Created_at:-</Text>
                <Text style={{fontSize:12}}>{data.item.created_at}</Text>

                <Text style={{fontWeight:'bold',padding:5}}>Author:-</Text>
                <Text style={{fontSize:12}}>{data.item.author}</Text>

                </Body>
                </CardItem>
                </Card>
                </TouchableOpacity>
                </View>
            );
        }

        filterPostByTitle(){
            const data = this.state.dataSource;
            const test = 'Lakshmi';
            console.log('**************',test.toLowerCase());
            data.sort((a,b)=>(a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
            {
                console.log('**************',JSON.stringify(data));

                return (
                    <View style={{alignItems: 'center'}}>
                        <ScrollView style={{}}>

                        {data.map((records)=>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Info', {
                                        // created_at: records.created_at,
                                        // title: records.title,
                                        // author: records.author,
                                        // url: records.url,
                                        data: records,
                                    })}
                                style={{

                                      padding:4,marginTop:10,
                                }}>
                                <Card>
                               <CardItem bordered>
                               <Text >{records.title}</Text>

                                    </CardItem>
                               <CardItem>
                               <Body>

                                <Text style={{fontWeight:'bold'}}>url:-</Text>
                                    <Text >{records.url}</Text>
                                    <Text style={{fontWeight:'bold'}}>created_at</Text>
                                    <Text >{records.created_at}</Text>

                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight:'bold'}} >author:-</Text>
                                    <Text >{records.author}</Text>
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

        filterPostByDate(){
            const data = this.state.dataSource;
            data.sort((a,b)=>(a.created_at > b.created_at) ? 1 : -1);
            {
                return (
                        <View style={{alignItems: 'center'}}>
                            <ScrollView style={{}}>
                            {data.map((records)=>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Info', {
                                    // created_at: records.created_at,
                                    // title: records.title,
                                    // author: records.author,
                                    // url: records.url,
                                    data: records,
                                })}
                                style={{

                                    padding:4,marginTop:10,
                              }}>
                              <Card>
                             <CardItem bordered>
                             <Text >{records.title}</Text>

                                  </CardItem>
                             <CardItem>
                             <Body>

                              <Text style={{fontWeight:'bold'}}>url:-</Text>
                                  <Text >{records.url}</Text>
                                  <Text style={{fontWeight:'bold'}}>created_at</Text>
                                  <Text >{records.created_at}</Text>

                              <View style={{flexDirection: 'row'}}>
                                  <Text style={{fontWeight:'bold'}} >author:-</Text>
                                  <Text >{records.author}</Text>
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

    render(){
        return (
                <View style={{marginTop:20}}>
                <View >
                    <View style={{display:'flex',flexDirection: 'row'}}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1,width: '60%',
                  padding:10,marginLeft:20,marginBottom: 20 }}
                    placeholder={'title,URL and author'}
                    onChangeText={news => this.setState({news})}
                    value={this.state.news}
                    />
                    {/* <TouchableOpacity
                    onPress={()=>
                                  this.setState({searchData:false,filterData:true})}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'green',marginLeft:10}}>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>Search</Text>
                    </TouchableOpacity> */}
                    <Button
       rounded
       style={{
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
       
      }}
        onPress={()=>
            this.setState({searchData:false,filterData:true})}
       >
        <Text>Search</Text>
      </Button>
      </View>

                    </View>
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                    {/* <TouchableOpacity
                    onPress={()=>
                                  this.setState({searchData:false,filterData:false,date:true})}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,width:'40%',borderRadius:22,
                   padding:10,backgroundColor:'green',marginLeft:10}}>
                    <Text style={{color:'#fff',fontSize:14,fontWeight:'bold',alignSelf:'center'}}>Filter by date</Text>
                    </TouchableOpacity> */}
                     <Button
       rounded
        style={{width: '40%', alignItems: 'center', justifyContent: 'center',}}
        onPress={()=>
            this.setState({searchData:false,filterData:false,date:true})}
       >
        <Text>Filter by created_at</Text>
      </Button>

                    {/* <TouchableOpacity
                    onPress={()=>
                                  this.setState({searchData:false,filterData:false,date:false})}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,width:'40%',borderRadius:22,
                   padding:10,backgroundColor:'green',marginLeft:10}}>
                    <Text style={{color:'#fff',fontSize:14,fontWeight:'bold',alignSelf:'center'}}>Filter by title</Text>
                    </TouchableOpacity> */}
                      <Button
       rounded
       style={{width: '40%', alignItems: 'center', justifyContent: 'center',}}
        onPress={()=>
            this.setState({searchData:false,filterData:false,date:false})}
       >
        <Text>Filter by title</Text>
      </Button>

                    </View>

                    <View style={{marginTop:10}}>
                     { this.state.searchData ?
                    <FlatList
                    data={this.state.dataSource}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.id}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0}
                        refreshing={this.state.loading}
                        ListFooterComponent={this.indicator()}
                    />
                    :
                    this.state.filterData ?
                        this.search()

                           :
                            this.state.date ?

                            this.filterPostByDate()

                                    :
                                    this.filterPostByTitle()

                     }

                    </View>
                </View>
        );
    }
}


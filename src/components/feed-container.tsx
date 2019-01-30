import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Dimensions } from "react-native";
import { FlatList, ActivityIndicator, TouchableWithoutFeedback,  Image } from "react-native";
import FeedBoxComponent from "./feed-box";
import FeedService from "../services/feed-service";
import Modal from 'react-native-modalbox';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export interface Props {
}

interface State {
  posts: any[];
  refreshing: boolean;
  lastId: string;
  loading: boolean;
  error: any;
  isVisible: boolean,
  isOpen: boolean,
  isDisabled: boolean,
}

export default class FeedContainerComponent extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);

    this.state = { posts: [], refreshing: false, lastId:"", 
    loading: false, error: null, isVisible: true, 
    isOpen: false, isDisabled: false}
  }

   // Called after a component is mounted
   componentDidMount() {
    this.fetchPosts();
   }

   //THE OG
  fetchPosts() {
    this.setState({ loading: true });

    FeedService.fetchData() 
    .then(posts => this.setState({ posts, refreshing: false, loading: false, lastId: posts[posts.length-1].id }))
    .then(() => console.log("How we POPPIN??:  " + this.state.lastId + "size of list: " + this.state.posts.length))
    .catch(error => {
      this.setState({ error, loading: false });
    });

  }

  fetchMorePosts() {
    setTimeout(()=>{

      var oldPosts = this.state.posts;
      var lastItem = this.state.lastId;
      this.state.posts.lastIndexOf

      FeedService.fetchMoreData(lastItem)
      .then(post => {this.setState({ posts: oldPosts.concat(post) , loading: false, lastId: post[post.length-1].id  })})
      .then(() => console.log("LETS SEE IF THIS WORKS updating:  " + this.state.lastId + "size of array: " + this.state.posts.length))
      .catch(error => {
        this.setState({ error, loading: false });
      });
    }, 1000);//For Dramatic effect

  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {this.fetchPosts();}
    );
  };

  handleLoadMore = () => {
    console.log('attempting to load more');

    this.setState(
      { loading: true },
      () => {this.fetchMorePosts();}
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#CED0CE",
          marginLeft: "4%",
          marginTop: 4,
        }}
      />
    );
  };


  renderFooter = () => {

    console.log('attempting to render footer');
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 30,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  

  onIconClick = (item:any) =>{
     this.refs.modalPop.open()
  }

  _renderItem = (item: any) => {
    return (
        <View>
          <TouchableWithoutFeedback onPress={ () => this.onIconClick(item)}>
            <View style={styles.GridViewContainer}>
              <FeedBoxComponent profileName={item.postGroup.owner.username} 
                                profileImageUrl={item.postGroup.owner.profileImageUrl} 
                                title={item.postGroup.title}
                                />
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
};

  render() {
    return (
      <View style={styles.root}>

        <Modal style={[styles.modal, styles.modalStyle]} position={"center"} ref={"modalPop"} isDisabled={this.state.isDisabled}>
          <Image style={{width: 350, height: 350}} resizeMode={"contain"}
          source={{  uri: "https://yada.land/static/images/logo.png"
                        }} ></Image>
          <Text style={styles.text}>We did it, Batman</Text>
        </Modal>

        <View style={styles.list}>
          <FlatList
              data={this.state.posts}
              numColumns={2}
              renderItem={ ({item}) => this._renderItem(item) }
              keyExtractor={item => item.id}
              ListFooterComponent={this.renderFooter}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              onEndReached={ this.handleLoadMore}
              onEndReachedThreshold={0.1}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  list: {
    flexDirection: 'row',
    height: height - 60,
    paddingBottom: 20,
    width: width,
    alignItems: 'stretch',
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  GridViewContainer: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 170,
    width: 200,
    margin: 2, 
    backgroundColor: '#fff',
    borderColor:'#CED0CE',
    borderRightWidth: .9,
    borderLeftWidth:.9,
    borderBottomWidth:.9,
    borderTopWidth:.9
 },
 GridViewTextLayout: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    color: '#fff',
    padding: 10,
  },
  modalStyle: {
    height: 400,
    width: 400
  },
  text: {
    color: "black",
    fontSize: 22
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});
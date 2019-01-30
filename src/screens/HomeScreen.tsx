import * as React from "react";
import { StyleSheet, View } from 'react-native';
import Header from '../components/header';
import FeedContainerComponent from '../components/feed-container';
import { Dimensions } from "react-native";

class HomeScreen extends React.Component {
  render() {
    const { container} = styles;
    return (
      <View style={container}>

        <Header title="! Yada Challenge !"  />

        <View>
          <FeedContainerComponent/>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});

export default HomeScreen;
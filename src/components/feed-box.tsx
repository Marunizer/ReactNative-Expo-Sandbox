import React from 'react';
import { Avatar } from "react-native-elements";
import {
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
import Modal from 'react-native-modalbox';

export interface Props {
  profileName: string;
  profileImageUrl?: string;
  title: string;
}

interface State {
  isVisible: boolean,
  isOpen: boolean,
  isDisabled: boolean,
}

export default class FeedBoxComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isVisible: true, isOpen: false,
      isDisabled: false,}
  }

  doCoolTHing = () => {
    this.refs.modalPop.open()
  }

  render() {
    return (
      <View style={styles.root}>

        <Modal style={[styles.modal, styles.modalStyle]} position={"center"} ref={"modalPop"} isDisabled={this.state.isDisabled}
              coverScreen={true}>
            <Image style={{width: 350, height: 350}} source={{  uri: this.props.profileImageUrl }} ></Image>
            <Text style={styles.text}>{this.props.profileName}</Text>
        </Modal>

        <View style={styles.container}>
          <View style={styles.header}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', height:100}}>
                 <View style={styles.inputWrap}>

                      <Avatar
                        size="large"
                        title= {this.props.profileName[0]}
                        rounded
                        source={{
                          uri:
                          this.props.profileImageUrl
                        }}
                        onPress={this.doCoolTHing}
                      />

                      <Text style={styles.username}>
                        {this.props.profileName}
                      </Text>

                  </View>
               </View>
            </View>

            <View style={styles.body}>
              <Text style={styles.title}>
                {this.props.title}
              </Text>
            </View>

          </View>

          <View
          style={{
            height: 1,
            width: "90%",
            backgroundColor: "#CED0CE",
            marginLeft: "4%",
            marginTop: 4,
          }}
        />
        
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  profileImgContainer: {
    marginLeft: 4,
    height: 60,
    width: 60,
    borderRadius: 60,
    overflow: 'hidden'
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  container: {
    flex:0,
    height: 170,
    width: 200,
    margin: 2, 
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  header : {
    flex: 0,
    alignSelf: 'stretch',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    marginLeft: 4,
    marginTop: 6
  },
  body : {
    flex: 0,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 16
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
  },
  username: {
    color: '#999',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 22
  },
  modalStyle: {
    height: 385,
    width: 350
  },
  text: {
    color: "black",
    fontSize: 22
  },
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
});
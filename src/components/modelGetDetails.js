import React, {useState} from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Card} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {addItemListHighScore} from '../store/actions';
import Toast from 'react-native-simple-toast';

function ModelGetDetails() {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(true);
  const level = useSelector(state => state.level);
  const score = useSelector(state => state.score);
  const [userName, setUserName] = useState('');

  return (
    <Modal style={styles.root} isVisible={isModalVisible}>
      <Card>
        <Card.Title>🙁 You lost 🙁</Card.Title>
        <Card.Title>Your reputation</Card.Title>
        <Card.Divider />
        <View style={styles.userReputation}>
          <Text>{`level: ${level}`}</Text>
          <Text>{`score: ${score}`}</Text>
        </View>
      </Card>
      <Text />
      <View style={styles.dialog}>
        <Text>Please enter your name</Text>
        <TextInput
          style={styles.texInput}
          value={userName}
          onChangeText={value => {
            setUserName(value);
          }}
          placeholder={'your name'}
        />
        <Button
          onPress={() => {
            if (userName.length > 0) {
              dispatch(
                addItemListHighScore({
                  score,
                  name: userName,
                }),
              );
              setModalVisible(false);
            } else {
              Toast('Please enter your name');
            }
          }}
          title={'go to list high score'}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  root: {backgroundColor: '#ffff'},
  userReputation: {
    alignSelf: 'center',
  },
  dialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texInput: {
    borderBottomColor: '#6767',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
});
export default ModelGetDetails;

import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Card} from 'react-native-elements';
import {getLisHighScore} from '../store/actions';

function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const listHighScore = useSelector(state => state.listHighScore);

  useEffect(() => {
    dispatch(getLisHighScore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      {listHighScore?.length > 0 && (
        <>
          <Card>
            <Card.Title>🏆 HIGH SCORE 🏆</Card.Title>
            <Card.Divider />
            <View style={styles.highScore}>
              <Text style={styles.highScore}>{listHighScore[0].score}</Text>
              <Text style={styles.highScore}>{listHighScore[0].name}</Text>
            </View>
          </Card>
        </>
      )}

      <View style={styles.button}>
        <Button
          title="start game"
          onPress={() => {
            navigation.navigate('Game');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
  highScore: {
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen;

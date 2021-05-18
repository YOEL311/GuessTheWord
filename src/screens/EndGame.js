import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {getLisHighScore, restartGame} from '../store/actions';
import ModelGetDetails from '../components/modelGetDetails';

function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const listHighScore = useSelector(state => state.listHighScore);

  useEffect(() => {
    dispatch(getLisHighScore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <ModelGetDetails />
      <Card>
        <Card.Title>🏅 HIGH SCORE 🏅</Card.Title>
        <Card.Divider />
        <View style={styles.table}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Score</Text>
        </View>
        <Card.Divider />

        {listHighScore.map((el, i) => {
          return (
            <View key={i} style={styles.table}>
              <Text style={styles.cell}>{el.name}</Text>
              <Text style={styles.cell}>{el.score}</Text>
            </View>
          );
        })}
      </Card>

      <Button
        title={'new game'}
        onPress={() => {
          navigation.navigate('Game');
          dispatch(restartGame());
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
  cell: {flex: 1, alignSelf: 'stretch'},
  table: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'stretch',
  },
});
export default HomeScreen;

import React, {useState, useEffect} from 'react';
import {I18nManager, View, Text, Button, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import produce from 'immer';
import Toast from 'react-native-simple-toast';
import {
  changeCurrentWord,
  decrementLifeTime,
  incrementLevel,
  incrementScore,
} from '../store/actions';
import LetterGuessInput from '../components/letterInput';

function Game({navigation}) {
  const dispatch = useDispatch();
  const currentWord = useSelector(state => state.currentWord);
  const level = useSelector(state => state.level);
  const lifeTime = useSelector(state => state.lifeTime);
  const score = useSelector(state => state.score);

  useEffect(() => {
    if (currentWord.fullWord) {
      Toast.show(fullWord); //TODO:only in debug mode
      setUserWordGuess(currentWord.hintWord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  const [userWordGuess, setUserWordGuess] = useState([]);
  const fullWord = currentWord.fullWord;
  const hintWord = currentWord.hintWord;

  useEffect(() => {
    dispatch(changeCurrentWord());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wordMatch = () => {
    dispatch(incrementLevel());
    dispatch(changeCurrentWord());
    dispatch(incrementScore(3));
  };

  const wordDisMatch = () => {
    Toast.show('Wrong guess');
    if (lifeTime === 1) {
      navigation.navigate('EndGame');
    } else {
      dispatch(decrementLifeTime());
    }
  };

  const clearInputUser = () => {
    setUserWordGuess([...hintWord]);
  };
  return (
    <View style={styles.root}>
      <>
        <Card>
          <Card.Title>🎯 Guess the word 🎯 </Card.Title>
          <Card.Divider />
          <View style={styles.highScore}>
            <Text>{`level: ${level}`}</Text>
            <Text>{`score: ${score}`}</Text>
            <Text>
              {'lifeTime :'}
              {[...Array(lifeTime)].map((el, i) => '😊')}
            </Text>
          </View>
        </Card>
      </>
      <View style={styles.contactSection}>
        <View style={styles.letterSection}>
          {userWordGuess?.map((letter, i) => {
            return (
              <LetterGuessInput
                key={i}
                myOnChange={val => {
                  setUserWordGuess(
                    produce(userWordGuess, draftState => {
                      draftState[i] = val;
                    }),
                  );
                }}
                letter={letter}
              />
            );
          })}
        </View>

        <View style={styles.buttonSection}>
          <View style={styles.buttonView}>
            <Button title="clear" onPress={clearInputUser} />
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Check guess"
              onPress={() => {
                if (userWordGuess.join('') === fullWord) {
                  wordMatch();
                } else {
                  wordDisMatch();
                  clearInputUser();
                }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
  contactSection: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  highScore: {
    alignSelf: 'center',
  },
  buttonSection: {
    flexDirection: 'row',
  },
  buttonView: {
    width: 120,
    margin: 20,
  },
  letterSection: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    direction: 'ltr',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
export default Game;

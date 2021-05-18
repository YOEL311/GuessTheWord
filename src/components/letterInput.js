import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const LetterGuessInput = ({myOnChange, letter}) => {
  return (
    <TextInput
      onChangeText={value => {
        myOnChange(value);
      }}
      editable={letter.length === 0}
      value={letter}
      style={styles.textInput}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: 50,
    fontSize: 20,
    margin: 10,
    color: 'green',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 5,
  },
});
export default LetterGuessInput;

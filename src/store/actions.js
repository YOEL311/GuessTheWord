import {
  DECREMENT_LIFE_TIME,
  INCREMENT_LEVEL,
  INCREMENT_SCORE,
  SUCCESS_GET_LIST_WORDS,
  SUCCESS_CHANGE_CURRENT_WORD,
  SUCCESS_GET_LIST_HIGH_SCORE,
  ADD_ITEM_LIST_HIGH_SCORE,
  RESTART_GAME,
} from './types';
import {listHighScoreData, listWordsData} from '../mock/data';

const decrementLifeTime = () => {
  return {
    type: DECREMENT_LIFE_TIME,
  };
};

const incrementLevel = () => {
  return {
    type: INCREMENT_LEVEL,
  };
};

const incrementScore = score => {
  return {
    type: INCREMENT_SCORE,
    payload: score,
  };
};

const hideWord = (fullWord, level) => {
  const arrStr = fullWord.split('');
  const percentageHide = 0.3 + level / 20;
  const newArr = arrStr.map(el => {
    if (Math.random() < percentageHide) {
      return '';
    } else {
      return el;
    }
  });
  if (newArr.every(el => el === '')) {
    newArr[0] = arrStr[0];
  }
  if (newArr.every(el => el !== '')) {
    newArr[0] = '';
  }
  return newArr;
};

const changeWord = (dispatch, listWords, level) => {
  const rangeRandom = listWords.length > 5 ? 5 : listWords.length;
  const elNewWord = Math.floor(Math.random() * rangeRandom);
  const fullWord = listWords.splice(elNewWord, 1)[0];
  dispatch(successGetListWords(listWords));
  const hintWord = hideWord(fullWord, level);
  dispatch(successChangeCurrentWord({fullWord, hintWord}));
};

const changeCurrentWord = () => {
  return (dispatch, getState) => {
    const {listWords, level} = getState();
    if (listWords.length !== 0) {
      changeWord(dispatch, listWords, level);
    } else {
      dispatch(getListWords());
    }
  };
};

const successChangeCurrentWord = word => {
  return {
    type: SUCCESS_CHANGE_CURRENT_WORD,
    payload: word,
  };
};

const getListWords = () => {
  return async (dispatch, getState) => {
    const level = getState().level;
    dispatch(successGetListWords(listWordsData));
    changeWord(dispatch, [...listWordsData], level);
  };
};

const successGetListWords = listWords => {
  return {
    type: SUCCESS_GET_LIST_WORDS,
    payload: listWords,
  };
};

const getLisHighScore = () => {
  return async dispatch => {
    dispatch(successGetLisHighScore(listHighScoreData));
  };
};

const addItemListHighScore = item => {
  return {
    type: ADD_ITEM_LIST_HIGH_SCORE,
    payload: item,
  };
};

const restartGame = () => {
  return {
    type: RESTART_GAME,
  };
};

const successGetLisHighScore = listHighScore => {
  return {
    type: SUCCESS_GET_LIST_HIGH_SCORE,
    payload: listHighScore,
  };
};

export {
  restartGame,
  decrementLifeTime,
  incrementLevel,
  successGetListWords,
  incrementScore,
  getListWords,
  getLisHighScore,
  changeCurrentWord,
  addItemListHighScore,
};

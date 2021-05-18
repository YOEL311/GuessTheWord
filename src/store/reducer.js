import {
  DECREMENT_LIFE_TIME,
  INCREMENT_LEVEL,
  INCREMENT_SCORE,
  SUCCESS_GET_LIST_WORDS,
  SUCCESS_GET_LIST_HIGH_SCORE,
  CHANGE_CURRENT_WORD,
  RESTART_GAME,
  ADD_ITEM_LIST_HIGH_SCORE,
} from './types';

const init = {
  listWords: [],
  level: 0,
  lifeTime: 3,
  score: 0,
  currentWord: {
    fullWord: '',
    hintWord: [],
  },
  listHighScore: [],
};

function reducer(state = init, action) {
  switch (action.type) {
    case RESTART_GAME:
      return {...init};
    case DECREMENT_LIFE_TIME:
      return {...state, lifeTime: state.lifeTime - 1};
    case INCREMENT_LEVEL:
      return {...state, level: state.level + 1};
    case INCREMENT_SCORE:
      return {...state, score: state.score + action.payload};
    case SUCCESS_GET_LIST_WORDS:
      return {...state, listWords: action.payload};
    case CHANGE_CURRENT_WORD:
      return {...state, currentWord: action.payload};
    case SUCCESS_GET_LIST_HIGH_SCORE:
      return {...state, listHighScore: action.payload};
    case ADD_ITEM_LIST_HIGH_SCORE: {
      const newList = [...state.listHighScore, action.payload];
      newList.sort((a, b) => b.score - a.score);
      return {
        ...state,
        listHighScore: newList,
      };
    }
    default:
      return state;
  }
}

export default reducer;

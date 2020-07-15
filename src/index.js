import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux'; 
import './index.css';
import Quiz from './Quiz';
import AddForm from "./Form";
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {ActionTypes as types} from './constants.js';

const musicians = [
  {
    name: 'Beyonce',
    imageUrl: 'images/musicians/Beyonce.jpg',
    songs: ['Halo', 'Crazy In Love']
  },
  {
    name: 'Bon Jovi',
    imageUrl: 'images/musicians/BonJovi.jpg',
    songs: ['Livin\' On A Prayer', 'It\' My Life']
  },
  {
    name: 'Ed Sheeran',
    imageUrl: 'images/musicians/EdSheeran.jpg',
    songs: ['Castle On The Hill', 'Shape Of You', 'Thinking Out Loud']
  },
  {
    name: 'Eminem',
    imageUrl: 'images/musicians/Eminem.jpg',
    songs: ['Lose Yourself']
  },
  {
    name: 'Rihanna',
    imageUrl: 'images/musicians/Rihanna.jpg',
    songs: ['Umbrella', 'Diamonds']
  },
  {
    name: 'Taylor Swift',
    imageUrl: 'images/musicians/TaylorSwift.jpg',
    songs: ['Look What You Made Me Do', 'Shake It Off']
  }
];

function getTurnData(musicians){
  const allSongs = musicians.reduce(function(p, c, i){
      return p.concat(c.songs);
  }, []);
  const fourRandomSongs = shuffle(allSongs).slice(0,4);
  const answer = sample(fourRandomSongs);

  return{
    songs: fourRandomSongs, 
    musician: musicians.find((musician) => musician.songs.some((title) => title===answer))
  }
}

let store = Redux.createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

function reducer (state = {musicians, turnData: getTurnData(musicians), highlight: ''}, action){
  switch(action.type){
    case types.ANSWER_SELECTED:
      const isCorrect=state.turnData.musician.songs.some((song) => song===action.answer);
      return{
        ...state,
        highlight: isCorrect? 'correct' : 'wrong'
      }
    case types.CONTINUE:
     return{
        ...state,
        highlight:'',
        turnData:getTurnData(state.musicians)
      }
    case types.ADD_MUSICIAN:
      return {
        ...state,
        musicians: state.musicians.concat([action.musician])
      }
    default: return state;

  }
  
}


  ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
     <React.Fragment>
        <Route exact path="/" component={Quiz} />
        <Route path="/add" component = {AddForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter> , document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

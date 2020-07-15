import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes, {isRequired} from 'prop-types';
import './App.css';
import './bootstrap.min.css';
import {ActionTypes as types} from './constants.js';


function Text(){
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
    <h1>Quiz</h1>
    <p>Select the song from musician which picture is dispayed</p>
    </div>
  </div>);
}
function Song({title, onClick}){
  return (<div className="answer" onClick={() => {onClick(title);}}>
    <h4>{title}</h4>
  </div>);
}
function Turn({musician, songs, highlight, onAnswerSelected}){
  function highlightToBgColor(highlight){
    const mapping = {
      'none' : '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (<div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={musician.imageUrl} className="musicianimage" alt="Musician"/>
    </div>
    <div className="col-6">
      {songs.map((title) => <Song title={title} key={title} onClick={onAnswerSelected} />)}
    </div>
  </div>);
}

Turn.propTypes = {
    musician: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    songs: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  songs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};
function Continue({show, onContinue}){
  return (<div className="row continue">
    { show
      ? <div className="col-11">
        <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
      :null
    }
  </div>);
}

function Footer(){
  return (<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">
        Musician Quiz
      </p>
    </div>
  </div>);
}

function mapStateToProps(state){
  return{
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch){
  return{
      onAnswerSelected: (answer) => {
      dispatch({type:types.ANSWER_SELECTED, answer});
      },
      onContinue: () =>{
        dispatch({type: types.CONTINUE});
      }
  };
}

const Quiz = connect(mapStateToProps, mapDispatchToProps) (
  function({turnData, highlight, onAnswerSelected, onContinue}) {
 
  return (
    <div className="container-fluid">
      <Text />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue show={highlight === 'correct'} onContinue={onContinue} />
      <p><Link to="/add">Add a musician</Link></p>
      <Footer />
    </div>
  );
 
});

export default Quiz;

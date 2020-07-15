import React from 'react';
import "./Form.css";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {ActionTypes as types} from './constants.js';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name: '',
            imageUrl: '',
            songs:[],
            songTemp: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddSong = this.handleAddSong.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onAddMusician(this.state);
    }
    onFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleAddSong(event){
        this.setState({
            songs: this.state.songs.concat([this.state.songTemp]),
            songTemp:''
        });
    }
    render(){
       return  <form onSubmit={this.handleSubmit}>
        <div className="Form__input">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
        </div>
        <div className="Form__input">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
        </div>
        <div className="Form__input">
            <label htmlFor="songTemp">Songs</label>
            {this.state.songs.map((song) => <p key={song}>{song}</p>)}
            <input type="text" name="songTemp" value={this.state.songTemp} onChange={this.onFieldChange}/>
            <input type="button" value="+" onClick={this.handleAddSong}/>
        </div>
        <input type="submit" value="Add" />
    </form>;
    }
}
function AddForm({match, onAddMusician}){
    return <div className="Form">
      <h1>Add Musician</h1>
        <Form onAddMusician = {onAddMusician}/>
    </div>;
  }

  function mapDispatchToProps(dispatch, props){
      return{
          onAddMusician: (musician) => {
              dispatch({type: types.ADD_MUSICIAN, musician});
                props.history.push('/');
          }
      };
  }
  export default withRouter(connect(() => {}, mapDispatchToProps)(AddForm));
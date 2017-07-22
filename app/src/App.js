import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: '',
      user: '',
      userPic: '',
      userInput: '',
      submitted: ''
    }

    this.checkUser = this.checkUser.bind(this)
    // this.updateInput = this.updateInput.bind(this)
    // this.submit = this.submit.bind(this)
  }

  checkUser() {
    return axios.get('/auth/me').then(res => {
      if(res) {
        this.setState({
          user: res.data.displayName,
          userPic: res.data.picture
        })
      }
    })
  }

  // updateInput(e) {
  //   this.setState({
  //     userInput: e.target.value
  //   })
  // }

  // submit() {
  //   return axios.post('/posting', {data: this.state.userInput}).then(res => {
  //     this.setState({
  //       submitted: res.data,
  //       userInput: ''
  //     })
  //   })
  // }

  componentDidMount() {
    this.checkUser() 
  }
 
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Auth0</h2>
        </div>

        { this.state.user ? null : <a href='http://localhost:4015/auth'><button>LOGIN</button></a> }
        { this.state.user ? <a href='http://localhost:4015/auth/logout'><button>LOGOUT</button></a> : null }

        <div className='userInfoBox'>

         <p>{ this.state.user ? this.state.user : 'Please Login' }</p> 

        { this.state.userPic ? null : <div></div> } 
        { this.state.userPic ? <img className='userPicture' src={ this.state.userPic } alt='userPic'/> : null }

        </div>

        {/* <input value={ this.state.userInput } onChange={ this.updateInput }/>

        <button disabled={ !this.state.user } onClick={ this.submit }>{ this.state.user ? 'SUBMIT' : 'Must Login' }</button>

        <p>{ this.state.submitted }</p> */}

      </div>
    );
  }
}

export default App;
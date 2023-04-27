import React, { useState, useEffect } from 'react';
import './settings.css';

class NotRegistered extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userData = JSON.stringify(this.state);
    console.log(userData);
    this.props.submitUser();
  }

  render() {
    return (
      <div className='login'>
        <div className="emailLogin">
          <p className='emailLoginTitle'>Email</p>
          <input type='email' name='email' value={this.state.email} onChange={this.handleChange} placeholder='email' className='emailLoginInput'/>
        </div>    
        <div className="passwordLogin">
          <p className='passwordLoginTitle'>Password</p>
          <input type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='password' className='passwordLoginInput'/>
        </div>
        <button className='submitLogin' onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default NotRegistered;

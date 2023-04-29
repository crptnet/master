import React, { useState, useEffect } from 'react';
import './settings.css';

const getData = async () => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    if(localStorage.getItem('token')) {
      const response = await fetch("http://localhost:5000/api/current", {
        method: 'GET',
        headers: headersList
      });
      const userData = await response.json();
      return userData;
    } else {
      return {email:'Unauthorized', password: 'Unauthorized'};
    }
  } catch (error) {
    console.error(error);
  }
}

const sendJSONToServer = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      body: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('My registered data:');
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
const getToken = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      body: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('My token:');
    console.log(data);
    localStorage.setItem('token', data.accessToken);
  } catch (error) {
    console.error(error);
  }
}



class NotRegistered extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'user',
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

  async handleSubmit(event) {
    event.preventDefault();
    const userData = JSON.stringify(this.state);
    console.log(userData);
    await sendJSONToServer(userData);
    const {username, email, password } = this.state;
    const dataToLogin = JSON.stringify({email, password});
    console.log('Data To login:');
    console.log(dataToLogin);
    if(email==undefined || password==undefined) {
      console.log('Cant get token!');
    } else {
      await getToken(dataToLogin);
    }
    const data = await getData();
    this.props.submitUser();
    return data;
  }

  render() {
    return (
      <div className='login'>
        <img src='./icons/logo.png' />
        <div className="emailLogin">
          <p className='emailLoginTitle'>Email</p>
          <input type='email' name='email' value={this.state.email} onChange={this.handleChange} placeholder='example@gmail.com' className='emailLoginInput'/>
        </div>    
        <div className="passwordLogin">
          <p className='passwordLoginTitle'>Password</p>
          <input type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='password' className='passwordLoginInput'/>
        </div>
        <div className="haveAcc">
          <p className='haveAccTitle'>Already have an account? </p>
          <button className='haveAddBtn'>Register</button>
        </div>
        <button className='submitLogin' onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export { getData };
export default NotRegistered;
import React, { useState, useEffect} from 'react';
import { getData } from './notRegistered';
import './settings.css';

function MainUserData (props) {
  const { deleteUser } = props;
  // const [userData, setUserData] = useState({username:'Not Registered', email:'Not Registered'});
  const [email, setEmail] = useState('Not Registered');
  const [username, setUsername] = useState('Not Registered');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if(data.email != undefined && data.username != undefined) {
        setEmail(data.email);
        setUsername(data.username);
        console.log('My data!!!');
        console.log(email);
        console.log(username);
      }
    };
    fetchData();
  }, [username, email]);
  
  return (
    <>
      <div className='mainDataContainer'>
        <div className='avatar'>
            <img src='./icons/avatar.png' />
        </div>
        <div className='userName'>
            <p className='userNameOuter'>Username</p>
            <p className='userNameInner'>{username}</p>
        </div>
        <div className='email'>
            <p className='emailOuter'>Email</p>
            <p className='emailInner'>{email}</p>
        </div>
        <div className='accLevel'>
            <p className='accLevelOuter'>Account level</p>
            <p className='accLevelInner'>Basic</p>
        </div>
        <button className='deleteUserBtn' onClick={deleteUser}>Delete user</button>
      </div>
    </>
  );
}

export default MainUserData;
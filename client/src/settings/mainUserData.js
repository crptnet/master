import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import {serverLink} from '../index';
import { sidebarRoot, mainRoot, modelRoot } from '../index';
import SideUserData from './sideUserData';
import NotRegistered from './notRegistered';
import './settings.css';

const getData = async () => {
  try {
    const headersList = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    if(localStorage.getItem('token')) {
      const response = await fetch(`${serverLink}api/current`, {
        method: 'GET',
        headers: headersList
      });
      const userData = await response.json();
      return userData;
    } 
    else {
      // TODO #redirect to login page
      return {email:'Unauthorized', password: 'Unauthorized'};
    }
  } 
  catch (error) 
  {
    console.error(error);
  }
}

function MainUserData () {
  const [email, setEmail] = useState('Not Registered');
  const [username, setUsername] = useState('Not Registered');
  const [avatar, setAvatar] = useState('./icons/avatar.png');
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

  async function confirmDeletion() {
    try {
        const headersList = {
          "Accept": "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        };
        if(localStorage.getItem('token')) {
          const response = await fetch(`${serverLink}api/delete`, {
            method: 'DELETE',
            headers: headersList
          });
          const userData = await response.json();
          localStorage.removeItem('token');
        } 
    } catch (error) {
      console.error(error);
    }
    modelRoot.render(
      <>
        <div className="circcontainer">
          <div className="circle" ></div>
        </div>
      </>
    );
    setTimeout(() => {
      mainRoot.render(<NotRegistered/>);
    }, 800);
    setTimeout(() => {
      modelRoot.render(
        <>
          <div className="circcontainer">
            <div className='circle shrink hidden'></div>
          </div>
        </>
      )
      setTimeout(() => {
        modelRoot.render(<></>)
      }, 800);
    }, 800);
  }

  const cancelDeletion = () => {
    modelRoot.render(<></>);
  }

  function logOut () {
    localStorage.removeItem('token');
    modelRoot.render(
      <>
        <div className="circcontainer">
          <div className="circle"></div>
        </div>
      </>
    );
    setTimeout(() => {
      mainRoot.render(<NotRegistered/>);
    }, 800);
    setTimeout(() => {
      modelRoot.render(
        <>
          <div className="circcontainer">
            <div className='circle shrink hidden'></div>
          </div>
        </>
      )
      setTimeout(() => {
        modelRoot.render(<></>)
      }, 800);
    }, 800);
  }

  function renderDeleteConfirmation () {
    modelRoot.render(
      <>
        <div className="delete-container" style={{ display: open ? 'block' : 'none' }}>
          <div className="delete-content">
            <img src="./icons/logo.png" alt="crpt.net" />
            <p className='delete-title'>Confirm deletion. This process is permanent.</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <button onClick={confirmDeletion} className='deleteConfirmBtn'>Delete</button>
            <button onClick={cancelDeletion} className='deleteCancelBtn'>Cancel</button>
            </div>
          </div>
        </div> 
      </>
    );
  }
  const [imageFile, setImageFile] = useState(null);


  const uploadPicture = async (e) => {
    setImageFile({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0],
    });
    e.preventDefault();
  }
  useEffect(()=>{
  async function pageSendToServer() {
    const formData = new FormData();
    formData.append("profilePicture", imageFile.pictureAsFile);

    console.log(imageFile)

    console.log(formData,"<--formDATA");

    const headersList = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": 'multipart/form-data; boundary=<calculated when request is sent>'
    };

    try {
      const response = await axios.post(`${serverLink}api/profile-picture`, formData, {
        headers: headersList
      });
      console.log(response.data, "<-- response data");
      console.log("Successfully uploaded image");
    } catch (error) {
      console.log("Error Found", error);
    }
  }

  if (imageFile !== null) {
    pageSendToServer();
  }


  async function pageGetFromServer() {
    const userData = await getData();
    //setAvatar(userData.profilePicture);
  }
  if(localStorage.getItem('token'))
  {
    pageGetFromServer();
    console.log('!');
    if(avatar!='./icons/avatar.png')
    {
      setAvatar(userData.profilePicture);
      //window.location.reload(true);
    }
  }
  },[imageFile]);

  return (
    <>
      <div className='mainDataContainer'>
        <div className='avatar'>
          <label htmlFor="file-input">
            <img src='./icons/addAvatar.png' className='addAvatarImage' />
          </label>
          <img src={avatar} className='avatarImage' key="profilePicture" />
          <input type="file" id="file-input" style={{ display: 'none' }} onChange={uploadPicture} />
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
        <div className='mainBtns'>
          <button className='logOutBtn' onClick={logOut}>Log out</button>
          <button className='deleteUserBtn' onClick={renderDeleteConfirmation}>Delete user</button>
        </div>
      </div>
    </>
  );
}

export default MainUserData;
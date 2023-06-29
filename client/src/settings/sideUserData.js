import React, { useState, useEffect, useRef } from 'react';
import './settings.css';
import {serverLink} from '../index';
import { sidebarRoot, mainRoot, modelRoot } from '../index';
import SideUserBtns from './sideUserBtns';
import MainUserData from './mainUserData';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './google';
import {fetchAPIKeys} from "../components/Fetchs/FetchAPIKeys";

function SideUserData () {
const [openEmailChange, setOpenEmailChange] = useState(false);
const [newEmail, setNewEmail] = useState('');
const [enterNum, setEnterNum] = useState(false);
const [emailToSend, setEmailToSend] = useState('');
const [newCode, setNewCode] = useState('');
const [sendCode, setSendCode] = useState(false);

const [openPasswordChange, setOpenPasswordChange] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [oldPassword, setOldPassword] = useState('');

const errorPosSide = useRef('');
const [errorContentSide,setErrorContentSide] = useState('');

const [googleActive, setGoogleActive] = useState('Not Registered');

useEffect(()=>{console.log("NewEmail:",newEmail,"EnterNum:",enterNum);},[newEmail,enterNum]);
const getData = async () => {
  try {
    const headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    if(localStorage.getItem('token')) {
      const response = await fetch(`${serverLink}api/current`, {
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

const requestChangeEmail = async () => {
  try {
    // console.log(JSON.stringify({email:newEmail}));
    const headersList = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": 'application/json'
    };
    if(localStorage.getItem('token')) {
      const response = await fetch(`${serverLink}api/change-email  `, {
        method: 'POST',
        body: JSON.stringify({ email : newEmail }),
        headers: headersList
      });
      const userData = response;
      let errorStatus = response.status;
      if(errorStatus != 200)
      {
        if(errorStatus==400)
        {
          errorPosSide.current = "Invalid email or is already taken"; 
        } 
        else if(errorStatus==404)
        {
          errorPosSide.current = 'Email is the same';
        }
      }
      else
      {
        errorPosSide.current = "";
      }
      // console.log("ERROR WITH EMAIL:",errorPosSide.current);
      setErrorContentSide(errorPosSide.current);
    }
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  const requestChangeCode = async () => {
    if (newCode.length == 6 && sendCode) {
      try {
        // console.log(JSON.stringify({code:newCode}));
        const headersList = {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": 'application/json'
        };
        if(localStorage.getItem('token')) {
          const response = await fetch(`${serverLink}api/change-email`, {
            method: 'PUT',
            body: JSON.stringify({code:newCode}),
            headers: headersList
          });
          const userData = response;
          setSendCode(false);
          // console.log("MESSAGE WITH ERROR:",response);
          let errorStatus = response.status;
          if(errorStatus != 200)
          {
            if(errorStatus==400)
            {
              errorPosSide.current = "Wrong code"; 
            } 
            else if(errorStatus==403)
            {
              errorPosSide.current = "New email is the same"; 
            } 
            else if(errorStatus==404)
            {
              errorPosSide.current = 'User not found';
            }
            else if(errorStatus==405)
            {
              errorPosSide.current = 'Provided email is the same as initial'
            }
            setErrorContentSide(errorPosSide.current);
          }
          else
          {
            closePopUp();
            window.location.reload(true);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    else if(sendCode)
    {
      errorPosSide.current = "Invalid code format"; 
      setSendCode(false);
    }
  }
  requestChangeCode();
}, [newCode,sendCode]);


const requestChangePassword = async () => {
  try {
    // console.log(JSON.stringify({currecntPassword:oldPassword,password:newPassword}));
    const headersList = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": 'application/json'
    };
    if(localStorage.getItem('token')) {
      const response = await fetch(`${serverLink}api/change-password-authed  `, {
        method: 'PUT',
        body: JSON.stringify({currecntPassword:oldPassword,password:newPassword}),
        headers: headersList
      });
      const userData = response;
      let errorStatus = response.status;
      if(errorStatus != 200)
      {
        if(errorStatus==400)
        {
          errorPosSide.current = "Invalid password"; 
        } 
        else if(errorStatus==404)
        {
          errorPosSide.current = 'User not found';
        }
      }
      else
      {
        errorPosSide.current = "";
        closePopUp();
      }
      setErrorContentSide(errorPosSide.current);
    }
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  if(openEmailChange)
  {
    modelRoot.render(
      <>
        <div className="delete-container" style={{ display: open ? 'block' : 'none' }}>
          <div className="delete-content">
            <img src="./icons/logo.png" alt="crpt.net" />
            <div className="error">{errorContentSide}</div>
            <p className='delete-title'>Enter new email here</p>
            <input type='email' maxLength={40} onChange={handleEmailInputChange1} placeholder='example@gmail.com'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
            <button style={{backgroundColor:'#5CC082', fontSize:'1rem', border: 'none', margin: '10px'}} onClick={submitNewEmail}>{emailToSend!=''?'Resend':'Submit'}</button>
            <button onClick={closePopUp} style={{backgroundColor:'transparent', fontSize:'2.5rem', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px'}}>&#215;</button>
            {enterNum ? ( 
              <div className='sumbitNum'>
                <p className='delete-title'>Enter the code sent to <span className='blue'>{emailToSend}</span> here</p>
                <input type='number' onChange={handleEmailInputChange2} placeholder='code'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
                <button style={{backgroundColor:'#5CC082', fontSize:'1rem', border: 'none', padding:'5px',  margin: '10px'}} onClick={submitNewCode}>Submit</button>
              </div>
            ):<></>}
          </div>
        </div> 
      </>
    )
  }
}, [emailToSend, newEmail, enterNum, openEmailChange, errorContentSide]);








function closePopUp() {
  modelRoot.render(<></>);
  setOpenEmailChange(false);
  setOpenPasswordChange(false);
  setEnterNum(false);
}

const submitNewEmail = () => {
  setEmailToSend(newEmail);
  requestChangeEmail();
  setEnterNum(true);
}

const submitNewCode = () => {
  setSendCode(true);
}

const handleEmailInputChange1 = (event) => {
  setNewEmail(event.target.value);
};

const handleEmailInputChange2 = (event) => {
  setNewCode(event.target.value);
};

const handlePasswordInputChange1 = (event) => {
  setOldPassword(event.target.value);
};

const handlePasswordInputChange2 = (event) => {
  setNewPassword(event.target.value);
};



useEffect(() => {
  if(openPasswordChange)
  {
    modelRoot.render(
      <>
        <div className="delete-container" style={{ display: open ? 'block' : 'none' }}>
          <div className="delete-content">
            <img src="./icons/logo.png" alt="crpt.net" />
            <div className="error">{errorContentSide}</div>
            <p className='delete-title'>Enter the <span className='blue'>old</span> password</p>
            <input type='password' onChange={handlePasswordInputChange1} placeholder='Examp1e'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
            <p className='delete-title'>Enter the <span className='blue'>new</span> password</p>
            <input type='password' onChange={handlePasswordInputChange2} placeholder='Examp1e'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
            <button style={{backgroundColor:'#5CC082', fontSize:'1rem', border: 'none', marginTop: '20px', flexDirection:'column'}} onClick={requestChangePassword}>Submit</button>
            <button onClick={closePopUp} style={{backgroundColor:'transparent', fontSize:'2.5rem', border: 'none', cursor: 'pointer', position: 'absolute', top: '-10px', right:'0'}}>&#215;</button>
          </div>
        </div> 
      </>
    )
  }
}, [newPassword, oldPassword, openPasswordChange, errorContentSide]);

function PopUpCheckEmail (email) {
  modelRoot.render(
    <>
      <div className="delete-container" style={{ display: open ? 'block' : 'none' }}>
        <div className="delete-content">
          <img src="./icons/logo.png" alt="crpt.net" />
          <p className='delete-title'>Check <span className='blue'>{email}</span></p>
          <p className='delete-title'>To confirm email authorization</p>
          <button onClick={closePopUp} className='deleteCancelBtn'>Close</button>
        </div>
      </div> 
    </>
  );
}

function APIKeysMenu() {
    window.location = '/settings/api-keys'
}

const SideDiv = (props) => {
  const {id, img, title, status, btn, email} = props;
  return(
    <div className={`sideDiv ${id}`}>
        <div className="sideLeft">
            <img src={`${img}`} className='sideImg'/>
            <p className='sideTitle'>{title}</p>
        </div>
        <div className="sideRight">
            <p className='sideStatus'>{status}</p>
              {title == 'Reset Email' && (
                <button className='sideBtnData' onClick={() => setOpenEmailChange(true)}>{btn}</button>
              )}
              {title == 'Reset Password' && (
                <button className='sideBtnData' onClick={() => setOpenPasswordChange(true)}>{btn}</button>
              )}
              {title == 'Google' && (
                <GoogleOAuthProvider clientId="22208776050-nv7hj7qppl8h39vpl9gkq31utgj43op8.apps.googleusercontent.com">
                  <Google/>
                </GoogleOAuthProvider>
              )}
              {title == 'Email Authentication' && (
                <button className='sideBtnData' onClick={() => PopUpCheckEmail(email)}>{btn}</button>
              )}
              {title == 'API management' && (
                <button className='sideBtnData' onClick={() => APIKeysMenu()}>{btn}</button>
              )}
              {title != 'API management' && title != 'Email Authentication' && title != 'Reset Email' && title != 'Reset Password' && title != 'Google' && (<button className='sideBtnData' onClick={() => {window.location.href = '/settings/api-keys'}}>{btn}</button>)}
        </div>
    </div>
  );
}

const SideButtons = () => {
  const [email, setEmail] = useState('Not Registered');
  const [username, setUsername] = useState('Not Registered');
  const [active, setActive] = useState('Not Registered');
  const [APIKeysAdded, setAPIKeysAdded] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if(data.email != undefined && data.username != undefined && data.active != undefined) {
        setEmail(data.email);
        setUsername(data.username);
        setActive(data.active);
        setGoogleActive(data.googleActive);
      }
    };
    fetchAPIKeys().then((res) => {
      setAPIKeysAdded(res.data.length)
    })
    fetchData();
  }, [username, email, active, googleActive]);
  
  return SideUserBtns.map((element) => {
    if(googleActive==false||(element.title != 'Reset Email'&&element.title!='Reset Password'&&element.title!='Google'&&element.title!='Email Authentication'))
    {
      return <SideDiv id={element.id} img={element.img} title={element.title} status={element.title=='Email Authentication'?(active?'Bound':'Un Bound'): element.id == 5 ? `${APIKeysAdded} ${APIKeysAdded == 1 ? 'key' : 'keys'} added` :element.status} btn={element.title=='Email Authentication'?(active?'Un Bind':'Bind'):element.btn} email={email}></SideDiv>;
    }
    return;
  });
};

  const classNameContainer = googleActive ? 'sideDataContainer short' : 'sideDataContainer long';
  return (
    <>
      <div className={classNameContainer}>
        <SideButtons />
        {googleActive && <p style={{textAlign:'center', margin:'20px'}}>Email and password are verified by binding GoogleAcc</p>}
      </div>
    </>
  );
}

export default SideUserData;
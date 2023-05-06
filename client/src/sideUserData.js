import React, { useState, useEffect, useRef } from 'react';
import './settings.css';
import { sidebarRoot, mainRoot, usermainRoot, usersideRoot, modelRoot } from './index';
import SideUserBtns from './sideUserBtns';
import MainUserData from './mainUserData';
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

useEffect(()=>{console.log("NewEmail:",newEmail,"EnterNum:",enterNum);},[newEmail,enterNum]);
const getData = async () => {
  try {
    const headersList = {
      "Accept": "*/*",
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

const requestChangeEmail = async () => {
  try {
    console.log(JSON.stringify({email:newEmail}));
    const headersList = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": 'application/json'
    };
    if(localStorage.getItem('token')) {
      const response = await fetch(`http://localhost:5000/api/change-email  `, {
        method: 'POST',
        body: JSON.stringify({ email : newEmail }),
        headers: headersList
      });
      const userData = response;
      console.log("update request:", userData);
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
      console.log("ERROR WITH EMAIL:",errorPosSide.current);
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
        console.log(JSON.stringify({code:newCode}));
        const headersList = {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": 'application/json'
        };
        if(localStorage.getItem('token')) {
          const response = await fetch("http://localhost:5000/api/change-email", {
            method: 'PUT',
            body: JSON.stringify({code:newCode}),
            headers: headersList
          });
          const userData = response;
          setSendCode(false);
          console.log("MESSAGE WITH ERROR:",response);
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
    console.log(JSON.stringify({currecntPassword:oldPassword,password:newPassword}));
    const headersList = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": 'application/json'
    };
    if(localStorage.getItem('token')) {
      const response = await fetch(`http://localhost:5000/api/change-password-authed  `, {
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
            {title == 'Email Authentication' && (
              <button className='sideBtnData' onClick={() => PopUpCheckEmail(email)}>{btn}</button>
            )}
            {title != 'Email Authentication' && title != 'Reset Email' && title != 'Reset Password' && (<button className='sideBtnData'>{btn}</button>)}
        </div>
    </div>
  );
}

const SideButtons = () => {
  const [email, setEmail] = useState('Not Registered');
  const [username, setUsername] = useState('Not Registered');
  const [active, setActive] = useState('Not Registered');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if(data.email != undefined && data.username != undefined && data.active != undefined) {
        setEmail(data.email);
        setUsername(data.username);
        setActive(data.active);
        console.log('My data!!!');
        console.log(email);
        console.log(username);
        console.log(active);
      }
    };
    fetchData();
  }, [username, email, active]);

  return SideUserBtns.map((element) => {
    return <SideDiv key={element.id} img={element.img} title={element.title} status={element.title=='Email Authentication'?(active?'Bound':'Un Bound'):element.status} btn={element.title=='Email Authentication'?(active?'Un Bind':'Bind'):element.btn} email={email}></SideDiv>;
  });
};


  return (
    <>
      <div className='sideDataContainer'>
          <SideButtons />
      </div>
    </>
  );
}

export default SideUserData;
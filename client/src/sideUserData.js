import React, { useState, useEffect} from 'react';
import './settings.css';
import { sidebarRoot, mainRoot, usermainRoot, usersideRoot, modelRoot } from './index';
import SideUserBtns from './sideUserBtns';
import MainUserData from './mainUserData';
function SideUserData () {
const [newEmail, setNewEmail] = useState('');
const [enterNum, setEnterNum] = useState(false);
const [emailToSend, setEmailToSend] = useState('');
const [newCode, setNewCode] = useState('');
const [codeToSend, setCodeToSend] = useState('');
const [open, setOpen] = useState(false);
useEffect(()=>{console.log("NewEmail:",newEmail,"EnterNum:",enterNum);},[newEmail,enterNum]);
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

const requestChangeEmail = async () => {
  try {
    console.log(JSON.stringify({email:newEmail}));
    const headersList = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    if(localStorage.getItem('token')) {
      const response = await fetch(`http://localhost:5000/api/change-email?newEmail=${newEmail}`, {
        method: 'POST',
        headers: headersList
      });
      const userData = await response.json();
      console.log("update request:", userData);
      return userData;
    } else {
      return {email:'Unauthorized', password: 'Unauthorized'};
    }
  } catch (error) {
    console.error(error);
  }
}

function closePopUp() {
  modelRoot.render(<></>);
  setOpen(false);
  setEnterNum(false);
}

const submitNewEmail = () => {
  setEmailToSend(newEmail);
  requestChangeEmail();
  setEnterNum(true);
}

const submitNewCode = () => {
  setCodeToSend(newCode);
  
}

const handleInputChange1 = (event) => {
  setNewEmail(event.target.value);
};

const handleInputChange2 = (event) => {
  const value = event.target.value;
  if (value.length <= 6) {
    setNewCode(value);
  }
};

useEffect((email) => {
  if(open)
  {
    console.log('EmailToSend',emailToSend);
    modelRoot.render(
      <>
        <div className="delete-container" style={{ display: open ? 'block' : 'none' }}>
          <div className="delete-content">
            <img src="./icons/logo.png" alt="crpt.net" />
            <p className='delete-title'>Enter new email here</p>
            <input type='email' maxLength={40} onChange={handleInputChange1} placeholder='example@gmail.com'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
            <button style={{backgroundColor:'#5CC082', fontSize:'1rem', border: 'none', margin: '10px'}} onClick={submitNewEmail}>{emailToSend!=''?'Resend':'Submit'}</button>
            <button onClick={closePopUp} style={{backgroundColor:'transparent', fontSize:'2.5rem', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px'}}>&#215;</button>
            {enterNum ? ( 
              <div className='sumbitNum'>
                <p className='delete-title'>Enter the code sent to <span className='blue'>{emailToSend}</span> here</p>
                <input type='number' onChange={handleInputChange2} placeholder='code'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
                <button style={{backgroundColor:'#5CC082', fontSize:'1rem', border: 'none', padding:'5px',  margin: '10px'}} onClick={submitNewCode}>Submit</button>
              </div>
            ):<></>}
          </div>
        </div> 
      </>
    )
  }
}, [emailToSend, newEmail, enterNum, open]);

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
              <button className='sideBtnData' onClick={() => setOpen(true)}>{btn}</button>
            )}
            {title == 'Email Authentication' && (
              <button className='sideBtnData' onClick={() => PopUpCheckEmail(email)}>{btn}</button>
            )}
            {title != 'Email Authentication' && title != 'Reset Email' && (<button className='sideBtnData'>{btn}</button>)}
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
import React, { useState, useEffect, useRef } from 'react';
import ServerLink from '../index';
import { mainRoot, modelRoot } from '../roots';
import MainUserData from './mainUserData';
import SideUserData from './sideUserData';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './google';

const NotRegistered = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const containerClass = showUsernameInput ? "register" : "login";

  const [moveToRecover, setMoveToRecover] = useState('');
  const [emailToRecover, setEmailToRecover] = useState('');
  const [emailToSend, setEmailToSend] = useState(false);

  const errorPos = useRef('');
  const [errorContent,setErrorContent] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const getData = async () => {
  try {
    const headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    
    if(localStorage.getItem('token')) {
      const response = await fetch(`${ServerLink}api/current`, {
        method: 'GET',
        headers: headersList
      });
      console.log(response.status);
      const userData = await response.json();
      if(response.status == 401)
      {
        errorPos.current = 'Unauthorized';
        return;
      }
      console.log('DATA IS HERE!!!!!');
      return userData;
    } else {
      errorPos.current = 'Invalid user data.';
      return {email:'Unauthorized', password: 'Unauthorized'};
    }
  } catch (error) {
    //setError(error.response.data.message);
  }
}

  const sendJSONToServer = async (userData) => {
    try {
      const response = await fetch(`${ServerLink}api/register`, {
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.status);
      const result = await response.json();
      if(response.status >= 400 && response.status <= 409)
      {
        
        try {
          errorPos.current = await result.message; 
        } catch (error) {
          console.error(error);
        }
        return;
      }
      return result;
    } catch (error) {
      //setError(error.response.data.message);
    }
  };
  
  const getToken = async (userData) => {
    try {
      const response = await fetch(`${ServerLink}api/login`, {
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.status);
      const data = await response.json();
      if(data.accessToken==undefined)
      {
        errorPos.current = await data.message;
        return;
      }
      else
      {
        console.log('My token:');
        console.log(data);
        localStorage.setItem('token', data.accessToken);
      }
    } catch (error) {
      //setError(error.response.data.message);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    errorPos.current='';
    const userData = JSON.stringify({ username, email, password });
    if (username === '' || email === '' || password === '') {
      errorPos.current='Every field should be filled';
    }
    if(!acceptedTerms) {
      errorPos.current='Accept terms & conditions';
    }
    console.log(userData);
    console.log('error:',errorPos.current);
    await sendJSONToServer(userData);
    if(errorPos.current=='')
    {
      const dataToLogin = JSON.stringify({ email, password });
      console.log('error:',errorPos.current);
      console.log('Data To login:');
      console.log(dataToLogin);
      if (email === '' || password === '') {
        errorPos.current='Every field should be filled';
      } else {
        await getToken(dataToLogin);
        if(errorPos.current=='')
        {
          const data = await getData();
          console.log('error:',errorPos);
          if(errorPos.current=='')
          {
            mainRoot.render(<><MainUserData /><SideUserData /></>);
          }
        }
      }
    }
    if(errorPos.current!='')
    {
      setErrorContent(errorPos.current);
    }
    console.log('error:',errorPos.current);
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const dataToLogin = JSON.stringify({ email, password });
    console.log('error:',errorPos.current);
    console.log('Data To login:');
    console.log(dataToLogin);
    if (email === '' || password === '') {
      errorPos.current='Every field should be filled';
    } else {
      await getToken(dataToLogin);
      if(errorPos.current=='')
      {
        const data = await getData();
        console.log('error:',errorPos);
        if(errorPos.current=='')
        {
          mainRoot.render(<><MainUserData /><SideUserData /></>);
        }
      }
    }
    if(errorPos.current!='')
    {
      setErrorContent(errorPos.current);
    }
    console.log('error:',errorPos.current);
  }
  const handlePasswordInputRecover1 = (event) => {
    console.log({ emailToRecoverParam : emailToRecover, event_value : event.target.value})
    setEmailToRecover(event.target.value);
  };  

  useEffect(() => {
    
    const sendRequest = async () =>{
      try {
        const headersList = {
          "Content-Type": 'application/json'
        };
        const response = await fetch(`${ServerLink}api/change-password`, {
          method: 'POST',
          body: JSON.stringify({ email : emailToRecover }),
          headers: headersList
        });
        console.log(response)
        const userData = response;
        let errorStatus = response.status;
        console.log(errorStatus);
        if(errorStatus != 200 && errorStatus != 500)
        {
          if(errorStatus==400)
          {
            errorPos.current = "Invalid password"; 
          } 
          else if(errorStatus==404)
          {
            errorPos.current = 'User not found';
          }
        }
        else
        {
          errorPos.current = "Email was sent";
        }
        setErrorContent(errorPos.current);
      } 
      catch (error) {
        console.error(error);
      }
    }
    if(emailToSend)
    {
      sendRequest();
      setEmailToSend(false);
    }
  }, [emailToSend]);

  function closePopUp() {
    setErrorContent('');
    setMoveToRecover(false);
    modelRoot.render(<></>);
  }

  useEffect(() => {
    if(moveToRecover)
    {
      modelRoot.render(
        <>
          <div className="delete-container" style={{ display: open ? 'block' : 'none' }}>
            <div className="delete-content">
              <img src="./icons/logo.png" alt="crpt.net" />
              <div className="error">{errorContent}</div>
              <p className='delete-title'>Enter the <span className='blue'>email</span> to recover</p>
              <input type='email' onChange={(event) => setEmailToRecover(event.target.value) } placeholder='Examp1e'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
              <button style={{backgroundColor:'#5CC082', fontSize:'1rem', border: 'none', marginTop: '20px', flexDirection:'column'}} onClick={()=>{setEmailToSend(true)}}>Submit</button>
              <button onClick={closePopUp} style={{backgroundColor:'transparent', fontSize:'2.5rem', border: 'none', cursor: 'pointer', position: 'absolute', top: '-10px', right:'0'}}>&#215;</button>
            </div>
          </div> 
        </>
      );
    }
  },[moveToRecover,errorContent])

  const moveToLogin = () => {
    setShowUsernameInput(false);
  }

  const moveToRegister = () => {
    setShowUsernameInput(true);
  }

  const acceptConditions = () => {
    if(acceptedTerms) {
      setAcceptedTerms(false);
    } else {
      setAcceptedTerms(true);
    }
    
  }

    return (
      <div className={containerClass}>
        <img src='./icons/logo.png'/>
        <div className="error">{errorContent}</div>
        {showUsernameInput && ( 
          <div className="usernameLogin appear-from-bottom">
            <p className='usernameLoginTitle'>Username</p>
            <input type='text' name='username' value={username} onChange={handleChange} placeholder='Examplify' className='usernameLoginInput' />
          </div>
        )}
        <div className="emailLogin">
          <p className='emailLoginTitle'>Email</p>
          <input type='email' name='email' value={email} onChange={handleChange} placeholder='example@gmail.com' className='emailLoginInput'/>
        </div>    
        <div className="passwordLogin">
          <p className='passwordLoginTitle'>Password</p>
          <input type='password' name='password' value={password} onChange={handleChange} placeholder='Examp1e' className='passwordLoginInput'/>
        </div>
        {showUsernameInput && ( 
          <button className={`acceptContidionsTitle appear-from-bottom ${acceptedTerms ? 'acceptedTerms' : 'notAcceptedTerms'}`} onClick={()=>{acceptConditions()}}>{acceptedTerms&&'Terms & Conditions Accepted'}{!acceptedTerms&&'Accept Terms & Conditions'}</button>
        )}
        <div className="haveAcc">
          <p className='haveAccTitle'>Forgot your password?</p>
          <button className='haveAccBtn' onClick={()=>setMoveToRecover(true)}>Recover</button>
        </div> 
        {showUsernameInput ? ( 
            <>
              <div className="haveAcc">
                <p className='haveAccTitle'>Already have an account?</p>
                <button className='haveAccBtn' onClick={moveToLogin}>Sign in</button>
              </div> 
              <button className='submitLogin' onClick={handleRegisterSubmit}>Sign up</button>
            </>
          ) : (
            <>
              <div className="haveAcc">
              <p className='haveAccTitle'>Dont have an account? </p>
              <button className='haveAccBtn' onClick={moveToRegister}>Sign up</button>
            </div> 
            <button className='submitLogin' onClick={handleLoginSubmit}>Sign in</button>
            </>
          )
        }
        <div className='googleSignIn'>
          <GoogleOAuthProvider clientId="22208776050-nv7hj7qppl8h39vpl9gkq31utgj43op8.apps.googleusercontent.com">
            <Google />
          </GoogleOAuthProvider>
        </div>
      </div>
    );
}

export default NotRegistered;
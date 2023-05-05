// import React, { useState, useEffect } from 'react';
// import { sidebarRoot, mainRoot, usermainRoot, usersideRoot, modelRoot } from './index';
// import './settings.css';

// const [error, setError] = useState('');

// const getData = async () => {
//   try {
//     const headersList = {
//       "Accept": "*/*",
//       "User-Agent": "Thunder Client (https://www.thunderclient.com)",
//       "Authorization": `Bearer ${localStorage.getItem('token')}`,
//     };
//     if(localStorage.getItem('token')) {
//       const response = await fetch("http://localhost:5000/api/current", {
//         method: 'GET',
//         headers: headersList
//       });
//       if (!response.ok) {
//         throw new Error(await response.text());
//       }
//       return await response.json();
//     } else {
//       return {email:'Unauthorized', password: 'Unauthorized'};
//     }
//   } catch (error) {
//     setError(error.message);
//   }
// }

// const sendJSONToServer = async (userData) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/register', {
//       method: 'POST',
//       body: userData,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     if (!response.ok) {
//       throw new Error(await response.text());
//     }
//     return await response.json();
//   } catch (error) {
//     setError(error.message);
//   }
// }
// const getToken = async (userData) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/login', {
//       method: 'POST',
//       body: userData,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     if (!response.ok) {
//       throw new Error(await response.text());
//     }
//     const data = await response.json();
//     console.log('My token:');
//     console.log(data);
//     localStorage.setItem('token', data.accessToken);
//   } catch (error) {
//     setError(error.message);
//   }
// }


// class NotRegistered extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: '',
//       email: '',
//       password: '',
//       showUsernameInput: false
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
//     this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
//     this.moveToLogin = this.moveToLogin.bind(this);
//     this.moveToRegister = this.moveToRegister.bind(this);
//     this.render = this.render.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   async handleRegisterSubmit(event) {
//     event.preventDefault();
//     const userData = JSON.stringify(this.state);
//     console.log(userData);
//     await sendJSONToServer(userData);
//     const {username, email, password } = this.state;
//     const dataToLogin = JSON.stringify({email, password});
//     console.log('Data To login:');
//     console.log(dataToLogin);
//     if(email==undefined || password==undefined) {
//       console.log('Cant get token!');
//     } else {
//       await getToken(dataToLogin);
//     }
//     const data = await getData();
//     this.props.submitUser();
//     return data;
//   }
//   async handleLoginSubmit(event) {
//     const {username, email, password } = this.state;
//     const dataToLogin = JSON.stringify({email, password});
//     console.log('Data To login:');
//     console.log(dataToLogin);
//     if(email==undefined || password==undefined) {
//       console.log('Cant get token!');
//     } else {
//       await getToken(dataToLogin);
//     }
//     const data = await getData();
//     this.props.submitUser();
//     return data;
//   }
//   moveToLogin() {
//     this.setState({ showUsernameInput: false });
//   }
//   moveToRegister() {
//     this.setState({ showUsernameInput: true });
//   }
//   render() {
//     const containerClass = this.state.showUsernameInput ? "register" : "login";
//     return (
//       <div className={containerClass}>
//         {error && <div className="error">{error}</div>}
//         <img src='./icons/logo.png'/>
//         {this.state.showUsernameInput && ( 
//           <div className="usernameLogin appear-from-bottom">
//             <p className='usernameLoginTitle'>Username</p>
//             <input type='text' name='username' value={this.state.username} onChange={this.handleChange} placeholder='Examplify' className='usernameLoginInput' />
//           </div>
//         )}
//         <div className="emailLogin">
//           <p className='emailLoginTitle'>Email</p>
//           <input type='email' name='email' value={this.state.email} onChange={this.handleChange} placeholder='example@gmail.com' className='emailLoginInput'/>
//         </div>    
//         <div className="passwordLogin">
//           <p className='passwordLoginTitle'>Password</p>
//           <input type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='Examp1e' className='passwordLoginInput'/>
//         </div>
//         {this.state.showUsernameInput ? ( 
//             <>
//               <div className="haveAcc">
//                 <p className='haveAccTitle'>Already have an account?</p>
//                 <button className='haveAccBtn' onClick={this.moveToLogin}>Login</button>
//               </div> 
//               <button className='submitLogin' onClick={this.handleRegisterSubmit}>Submit</button>
//             </>
//           ) : (
//             <>
//               <div className="haveAcc">
//               <p className='haveAccTitle'>Dont have an account? </p>
//               <button className='haveAccBtn' onClick={this.moveToRegister}>Register</button>
//             </div> 
//             <button className='submitLogin' onClick={this.handleLoginSubmit}>Submit</button>
//             </>
//           )
//         }
        
        
//       </div>
//     );
//   }
// }

// export { getData };
// export default NotRegistered;










import React, { useState, useEffect, useRef } from 'react';
import { sidebarRoot, mainRoot, usermainRoot, usersideRoot, modelRoot } from './index';
import MainUserData from './mainUserData';
import SideUserData from './sideUserData';
import './settings.css';

const NotRegistered = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const containerClass = showUsernameInput ? "register" : "login";

  const [emailToRecover, setEmailToRecover] = useState('');
  const [emailToSend, setEmailToSend] = useState('');

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
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    };
    
    if(localStorage.getItem('token')) {
      const response = await fetch("http://localhost:5000/api/current", {
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
      const response = await fetch('http://localhost:5000/api/register', {
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
      const response = await fetch('http://localhost:5000/api/login', {
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
            mainRoot.render(<></>);
            usermainRoot.render(<MainUserData />);
            usersideRoot.render(<SideUserData />);
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
          mainRoot.render(<></>);
          usermainRoot.render(<MainUserData />);
          usersideRoot.render(<SideUserData />);
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


  // const handleNewEmail = async () => {
  //   console.log("emailToRecover!",emailToRecover);
  //   if(emailToRecover!='')
  //   {
  //     console.log("HELP!");
  //     try {
  //       console.log("EMAIL!:", emailToSend);
  //       const headersList = {
  //         "Content-Type": 'application/json'
  //       };
  //       if(localStorage.getItem('token')) {
  //         const response = await fetch(`http://localhost:5000/api/change-password  `, {
  //           method: 'POST',
  //           body: JSON.stringify({email:emailToRecover}),
  //           headers: headersList
  //         });
  //         const userData = response;
  //         let errorStatus = response.status;
  //         if(errorStatus != 200)
  //         {
  //           if(errorStatus==400)
  //           {
  //             errorPos.current = "Invalid password"; 
  //           } 
  //           else if(errorStatus==404)
  //           {
  //             errorPos.current = 'User not found';
  //           }
  //         }
  //         else
  //         {
  //           errorPos.current = "";
  //           closePopUp();
  //         }
  //         setErrorContent(errorPos.current);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }

  // useEffect(() => {
    
  // }, [emailToSend]);

  useEffect(() => {
    
  }, [emailToSend]);

  // useEffect(() => {
  //   console.log(`Email to send ${emailToRecover}`);
  // }, [emailToSend]);

  function closePopUp() {
    modelRoot.render(<></>);
    // setOpenEmailChange(false);
    // setOpenPasswordChange(false);
    // setEnterNum(false);
  }
  const moveToRecover = () => {
    modelRoot.render(
      <>
        <div className="delete-container" style={{ display: open ? 'block' : 'none' }}>
          <div className="delete-content">
            <img src="./icons/logo.png" alt="crpt.net" />
            <div className="error">{errorContent}</div>
            <p className='delete-title'>Enter the <span className='blue'>email</span> to recover</p>
            <input type='email' onChange={handlePasswordInputRecover1} placeholder='Examp1e'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
            <button style={{backgroundColor:'#5CC082', fontSize:'1rem', border: 'none', marginTop: '20px', flexDirection:'column'}} onClick={()=>{setEmailToSend(emailToRecover)}}>Submit</button>
            {/* <p className='delete-title'>Enter the <span className='blue'>new</span> password</p>
            <input type='password' onChange={handlePasswordInputRecover2} placeholder='Examp1e'  style={{color:'#252525', fontSize:'1rem', border: 'none', borderRadius:'5px', padding:'5px'}}/>
            <button style={{backgroundColor:'#5CC082', fontSize:'1rem', border: 'none', marginTop: '20px', flexDirection:'column'}} onClick={requestChangePassword}>Submit</button> */}
            <button onClick={closePopUp} style={{backgroundColor:'transparent', fontSize:'2.5rem', border: 'none', cursor: 'pointer', position: 'absolute', top: '-10px', right:'0'}}>&#215;</button>
          </div>
        </div> 
      </>
    )
  }
  const moveToLogin = () => {
    setShowUsernameInput(false);
  }
  const moveToRegister = () => {
    setShowUsernameInput(true);
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
        <div className="haveAcc">
          <p className='haveAccTitle'>Forgot your password?</p>
          <button className='haveAccBtn' onClick={moveToRecover}>Recover</button>
        </div> 
        {showUsernameInput ? ( 
            <>
              <div className="haveAcc">
                <p className='haveAccTitle'>Already have an account?</p>
                <button className='haveAccBtn' onClick={moveToLogin}>Login</button>
              </div> 
              <button className='submitLogin' onClick={handleRegisterSubmit}>Submit</button>
            </>
          ) : (
            <>
              <div className="haveAcc">
              <p className='haveAccTitle'>Dont have an account? </p>
              <button className='haveAccBtn' onClick={moveToRegister}>Register</button>
            </div> 
            <button className='submitLogin' onClick={handleLoginSubmit}>Submit</button>
            </>
          )
        }
      </div>
    );
}

export default NotRegistered;
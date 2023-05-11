import React from 'react';
import './settings.css';
import { useGoogleLogin } from '@react-oauth/google';

const Google = () => {

  const myLogBtn = useGoogleLogin({
    clientId: "22208776050-nv7hj7qppl8h39vpl9gkq31utgj43op8.apps.googleusercontent.com",
    onSuccess: async (res) => {
      console.log(res);
      var token = await fetch('http://localhost:5000/api/googleSingIn', {
        method : 'POST',
        headers : {
          'Authorization' : `Bearer ${res.access_token}`
        }
      })

      token = await token.json()
      console.log(token)
      console.log(token.accessToken)
      localStorage.setItem('token', token.accessToken)
      window.location.reload(true)
    },
    onFailure: () => {
      console.log('fuck google');
    }
  });
  if(localStorage.getItem('token'))
  {
    return (<button className='sideBtnData' onClick={myLogBtn}>Bind</button>);
  }
  else
  {
    return (
    <div style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', marginTop:'15px'}}>
      <div style={{display:'flex', justifyContent:'center'}}>
        <div style={{maxHeight:'2px', backgroundColor:'white', minWidth:'150px', marginTop:'10px'}}></div>
        <span style={{marginLeft:'5px', marginRight:'5px'}}>OR</span>
        <div style={{maxHeight:'2px', backgroundColor:'white', minWidth:'150px', marginTop:'10px'}}></div>
      </div>
      <button style={{width:'230px', backgroundColor:'#4682B4', color:'white', border:'none', borderRadius:'5px', padding:'5px', margin:'15px', cursor:'pointer'}} onClick={myLogBtn}>Sign in with Google</button>
    </div>
    );
  }
}

export default Google;
import React from 'react';
import '../settings.css';
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
    return (
      <button className='sideBtnData' onClick={myLogBtn}>Bind</button>
    )
}

export default Google;
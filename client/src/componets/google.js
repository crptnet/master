import React from 'react';

import { GoogleLogin } from '@react-oauth/google';

const Google = () => {

    return (
        <GoogleLogin 
            onSuccess={async (res) => {
              console.log(res);
              var token = await fetch('http://localhost:5000/api/googleSingIn', {
                method : 'POST',
                headers : {
                  'Authorization' : `Bearer ${res.credential}`
                }
              })

              token = await token.json()
              console.log(token)
              localStorage.setItem('token', token.accessToken)
            }}
            onError={() => {
              console.log('fuck google');
            }}
          />
    )
}

export default Google;
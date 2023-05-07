import React from 'react';

import { GoogleLogin } from '@react-oauth/google';

const Google = () => {

    return (
        <GoogleLogin 
            onSuccess={async (res) => {
              console.log(res);
              const token = await fetch('http://localhost:5000/api/googleSingIn', {
                method : 'POST',
                headers : {
                  'Authorization' : `Bearer ${res.credential}`
                }
              })
              console.log(token)
              localStorage.setItem('token', token)
            }}
            onError={() => {
              console.log('fuck google');
            }}
          />
    )
}

export default Google;
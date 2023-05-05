import React, { useState, useEffect } from 'react';
import { sidebarRoot, mainRoot, usermainRoot, usersideRoot, modelRoot } from './index';
import './settings.css';

const ResetPasswordPage = (props) => {
    
    const [message, setMessage] = useState("");
    const [sendNewPassword, setSendNewPassword] = useState(false);
    const [passwordToRecover, setPasswordToRecover] = useState("");

    useEffect(() => {

        const resetPassword = async () => {
            console.log('nice!!!');
            const queryParams = new URLSearchParams(props.location.search);
            const token = queryParams.get("token");
            try {
                const response = await fetch(`http://localhost:5000/api/change-password?token=${token}&password=${passwordToRecover}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if(response.status == 200)
                {
                    console.log('nice!');
                    setMessage("Password reset successful");
                } else {
                    console.log('not nice!');
                    setMessage("Password reset failed");
                }
            } catch (error) {
                setMessage("An error occurred while resetting your password");
            }
        };
        if(sendNewPassword==true)
        {
            resetPassword();
            setSendNewPassword(false);
            console.log('!!!',message);
        }
    }, [sendNewPassword]);

  useEffect(()=>{
    modelRoot.render (
        <>
            <div className="activate-container">
            <a href="../"><img src='./icons/logo.png' className='activate-logo'/></a>
            <p className='activate-title'>{message}</p>
            <h1>Enter the new password</h1>
            <input type='password' placeholder='Examp1e' onChange={(event) => setPasswordToRecover(event.target.value)}/>
            <button onClick={()=>setSendNewPassword(true)}>Submit</button>
            </div>
        </>
    )
  },[message]) 
};

export default ResetPasswordPage;
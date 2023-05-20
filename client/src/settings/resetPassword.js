import React, { useState, useEffect } from 'react';
import {serverLink} from '../index';
import { sidebarRoot, mainRoot, usermainRoot, usersideRoot, modelRoot } from '../index';
import './active.css';

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
                const response = await fetch(`${serverLink}api/change-password?token=${token}&password=${passwordToRecover}`, {
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
                setMessage("An error occurred while resetting your password. Try sending request one more time");
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
                {message!='Password reset successful' &&
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                        <p className='activate-error'>{message}</p>
                        <p className='activate-title'>Enter the new password</p>
                        <input type='password' placeholder='Examp1e' onChange={(event) => setPasswordToRecover(event.target.value)} className='activate-input'/>
                        <button onClick={()=>setSendNewPassword(true)} className='activate-submit'>Submit</button>
                    </div>
                }
                {message=='Password reset successful' &&<p className='activate-error'>{message}</p>}
            </div>
        </>
    )
  },[message]) 
};

export default ResetPasswordPage;
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {serverLink} from '../index';
import { sidebarRoot, mainRoot, usermainRoot, usersideRoot, modelRoot } from '../index';
import './active.css';


const ResetEmailPage = (props) => {
    mainRoot.render(
        <>
            <h1>Enter new email here</h1>
            <input type='email' placeholder='example@gmail.com' />
            <button>Submit</button>
        </>
    );
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyAccount = async () => {
            const queryParams = new URLSearchParams(props.location.search);
            const token = queryParams.get("token");
            try {
                const response = await fetch(`${serverLink}api/reset-email?token=${token}&id=${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if(response.status == 200)
                {
                    setMessage("Account verified");
                } else {
                    setMessage("Account verification failed");
                }
            } catch (error) {
                setMessage("An error occurred while verifying your account");
            }
        };

        verifyAccount();
    }, []);

  return (
    <div className="activate-container">
      <a href="../"><img src='./icons/logo.png' className='activate-logo'/></a>
      <p className='activate-title'>{message}</p>
    </div>
  );
};

export default ResetEmailPage;
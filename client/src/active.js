import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './active.css';
const mainRoot = document.getElementById('main');


const ActiveAccountPage = (props) => {
  const [message, setMessage] = useState("Verifying account...");

  useEffect(() => {
    const verifyAccount = async () => {
        const queryParams = new URLSearchParams(props.location.search);
        const key = queryParams.get("key");
        const id = queryParams.get("id");
        try {
            const response = await fetch(`http://localhost:5000/api/activate?key=${key}&id=${id}`, {
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

export default ActiveAccountPage;
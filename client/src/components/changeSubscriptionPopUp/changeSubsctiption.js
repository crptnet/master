import React from 'react';
import './changeSubscription.css'
import { serverLink } from '../..';

const ChangeSubsctiption = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmationContainer">
      <div>
        <img src={`${serverLink}upload/stopHandEmoji.png`}></img>
        <div>
          <h2>Are you sure you want to change your subscription?</h2>
        </div>
        <div>
          <p>By changing your subscription, you may lose access to certain features or benefits associated with your current subscription plan. Please review the details of the new subscription plan carefully before proceeding.</p>
        </div>
        <div>
          <p>If you have any questions or concerns regarding the subscription change, we recommend reaching out to our support team for clarification.</p>
        </div>
      </div>
      <div className="confirmationButtons">
        <div>
          <p className='confirmationMessage'>To confirm the subscription change, please click "Confirm" below. If you prefer to keep your current subscription, simply close this popup or click "Cancel".</p>
        </div>
        <div>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeSubsctiption;

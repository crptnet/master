import React from 'react';
import './confirmationComponent.css'
import { serverLink } from '../..';

const ConfirmationComponent = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmationContainer">
      <div>
        <img src={`${serverLink}upload/stopHandEmoji.png`}></img>
        <div>
          <h2>Are you sure you want to cancel your subscription?</h2>
        </div>
        <div>
          <p>This action is irreversible and you will lose access to all the benefits and features of your subscription. <br/> Please consider the consequences before proceeding.</p>
        </div>
        <div>
          <p>If you have any concerns or issues, we encourage you to contact our support team before canceling your subscription.</p>
        </div>
      </div>
      <div className="confirmationButtons">
        <div>
          <p className='confirmationMessage'>To confirm your cancellation, please click "Confirm" below. If you'd like to keep your subscription, simply close this popup or click "Cancel".</p>
        </div>
        <div>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationComponent;

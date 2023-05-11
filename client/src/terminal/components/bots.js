import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../terminal.css';

const Bots = () => {
    const [activeButton, setActiveButton] = useState('bots');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    return (
    <div className="bots-alerts-analysis">
        <div className="bots-alerts-analysis-btn-container">
            <button 
            className={activeButton === 'bots' ? 'act' : 'nact'}
            onClick={() => handleButtonClick('bots')}
            >
                Bots
            </button>
            <button 
                className={activeButton === 'active' ? 'act' : 'nact'}
                onClick={() => handleButtonClick('active')}
            >
                Active
            </button>
            <button 
            className={activeButton === 'alerts' ? 'act' : 'nact'}
            onClick={() => handleButtonClick('alerts')}
            >
                Alerts
            </button>
         </div>
        <div className="bots-alerts-analysis-body">
            {activeButton === 'bots' && (
                <div className="bots-container">
                    BOTS
                </div>
            )}
            {activeButton === 'active' && (
                <div className="active-container">
                    ACTIVE
                </div>
            )}
            {activeButton === 'alerts' && (
                <div className="alerts-container">
                    ALERTS
                </div>
            )}
        </div>
    </div>
  );
}

export default Bots;
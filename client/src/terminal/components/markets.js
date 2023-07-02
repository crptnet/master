import React, { useState } from 'react';

const Markets = () => {
    const [activeButton, setActiveButton] = useState('markets');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    return (
        <div className="market-news-notes">
            <div className="market-news-notes-btn-container">
                <button 
                className={activeButton === 'markets' ? 'act' : 'nact'}
                onClick={() => handleButtonClick('markets')}
                >
                    Markets
                </button>
                <button 
                    className={activeButton === 'news' ? 'act' : 'nact'}
                    onClick={() => handleButtonClick('news')}
                >
                    News
                </button>
                <button 
                className={activeButton === 'notes' ? 'act' : 'nact'}
                onClick={() => handleButtonClick('notes')}
                >
                    Notes
                </button>
            </div>
            <div className="bots-alerts-analysis-body">
                {activeButton === 'markets' && (
                    <div className="markets-container">
                        Markets
                    </div>
                )}
                {activeButton === 'news' && (
                    <div className="news-container">
                        News
                    </div>
                )}
                {activeButton === 'notes' && (
                    <div className="notes-container">
                        Notes
                    </div>
                )}
            </div>
        </div>
    );
}

export default Markets;
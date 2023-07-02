// View.js
import React from 'react';
import Model from './model';

import Features from './components/features';
import Authors from './components/authors';
import Contacts from './components/contacts';
import GitHub from './components/github';
import Policy from './components/policy';

const View = () => {
    const model = Model();
    const { content } = model;
    
    let i = 1;
    return (
        <div className='helpContainerOuter'>
            <div className='helpTitle'>Say Hi! to CRPT.net</div>
            {content.map((elem, index) => (
                <div className='helpSector' key={index}>
                    <div className='helpNum'>
                        {i++}.&nbsp;{elem.title}
                    </div>
                    <div className='helpIntroContent'>
                        {elem.title=='CRPT.net features' && <Features />}
                        {elem.title=='About authors' && <Authors />}
                        {elem.title=='Our contacts' && <Contacts />}
                        {elem.title=='Github source' && <GitHub />}
                        {elem.title=='Privacy policy' && <Policy />}
                    </div>
                </div>
            ))}
        </div>
    );  
};

export default View;

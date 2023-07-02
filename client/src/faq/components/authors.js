import React from 'react';
import Model from '../model';

const Authors = () => {
    const model = Model();
    const { authors } = model;

    return (
        <div className='authorsContainer'>
            {authors.map((elem, index) => (
            <div key={index} className='authorInfoContainer'>
                {elem.icon}
                <div className='authorDescription'>
                <p className='featureSectionTitle'>{elem.name}</p>
                <p className='featureSectionContent'>{elem.data}</p>
                </div>
            </div>
            ))}
        </div>
    );
}
  
export default Authors;
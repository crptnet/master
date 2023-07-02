import React from 'react';
import Model from '../model';

const Features = () => {
    const model = Model();
    const { features } = model;

    return (
        <div>
            {features.map((elem, index) => (
            <div key={index}>
                {elem.title=='Seamless Trading Experience'||elem.title=='Crypto Conversion Made Easy'||elem.title=='Explore and Discover' ? <><div className='featureHeaderContainerRight'><div><p className='featureSectionTitle'>{elem.title}</p><p className='featureSectionContent'>{elem.content}</p></div><p>{elem.icon}</p></div></> : <><div className='featureHeaderContainerLeft'><p>{elem.icon}</p><div><p className='featureSectionTitle'>{elem.title}</p><p className='featureSectionContent'>{elem.content}</p></div></div></>}
            </div>
            ))}
        </div>
    );
}

  export default Features;
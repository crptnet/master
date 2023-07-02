import React from 'react';
import Model from '../model';
import { FaGithub, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa';

const Contacts = () => {
    const model = Model();
    const { authors } = model;

    return (
        <div className='helpContactsContainer'>
            {authors.map((elem, index) => (
            <div key={index} className='helpContactsInfoContainer'>
                <p>{elem.name}</p>
                <div>
                <a href={elem.instagram}><FaInstagram size={64}/></a>
                <a href={elem.telegram}><FaTelegram size={64}/></a>
                <a href={elem.github}><FaGithub size={64}/></a>
                <a href={elem.linkedin}><FaLinkedin size={64}/></a>
                </div>
            </div>
            ))}
        </div>
    );
}

  export default Contacts;
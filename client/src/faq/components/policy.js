import React from 'react';
import { FaCopyright } from 'react-icons/fa';


const Policy = () => {
    return (
        <div className='helpPolicyContainer'>
            <p className='featureSectionContent' style={{backgroundColor:'#333333'}}>At CRPT.net , we hold privacy as a fundamental value. We are dedicated to safeguarding the personal information you entrust to us. Through strict adherence to privacy policies and industry best practices, we ensure that your data remains secure and confidential. Your trust is of utmost importance to us, and we strive to provide you with a safe and transparent experience while respecting your privacy at every step.</p>
            <p className='featureSectionContent' style={{backgroundColor:'#333333',display:'flex',alignItems:'center', justifyContent:'center'}}> <FaCopyright /> &nbsp; 2023 CRPT.net </p>
        </div>
    )
}

export default Policy;
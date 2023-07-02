import React from 'react';
import { FaGithub } from 'react-icons/fa';

const GitHub = () => {
    return (
        <div className='helpGithubContainer'>
            <p className='featureSectionContent' style={{backgroundColor:'#333333'}}>As passionate authors, we firmly believe in the power of open code. We are thrilled to announce that we have made the bold decision to open our Git repository to the world, inviting fellow developers and enthusiasts to join us in this journey of collaborative creation. By embracing transparency and fostering a community of co-creators, we aim to cultivate an environment where ideas flourish and innovation knows no bounds. Together, let`s push the boundaries of what`s possible and shape the future of technology.</p>
            <a href='https://github.com/crptnet/master' className='githubLink'><FaGithub size={128} /></a>
        </div>
    );
}

export default GitHub;
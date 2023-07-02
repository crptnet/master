// Model.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine,faExchangeAlt,faDollarSign,faWallet,faCoins,faGift,faUser } from '@fortawesome/free-solid-svg-icons';
import { FaGithub,FaCopyright,FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa';


const Model = () => {

    const content = [
        {title:'CRPT.net features', 
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed vestibulum mi, nec facilisis nisi. Sed hendrerit metus eget lorem ullamcorper ultrices. Nulla facilisi. Suspendisse potenti. Curabitur blandit eleifend purus, eget interdum velit. Phasellus elementum nunc a malesuada rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed dapibus, neque in fermentum efficitur, nisi mi pellentesque turpis, eu pretium turpis tellus in enim. In eu erat leo. Sed sit amet nulla id sem consectetur auctor. Vivamus fringilla malesuada lectus, vel iaculis ligula faucibus id. Curabitur sed dui sed lacus dictum mattis. Aliquam tristique ligula vitae volutpat condimentum. Donec tincidunt pulvinar ipsum, id bibendum enim viverra vitae."},
        {title:'About authors',
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed vestibulum mi, nec facilisis nisi. Sed hendrerit metus eget lorem ullamcorper ultrices. Nulla facilisi. Suspendisse potenti. Curabitur blandit eleifend purus, eget interdum velit. Phasellus elementum nunc a malesuada rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed dapibus, neque in fermentum efficitur, nisi mi pellentesque turpis, eu pretium turpis tellus in enim. In eu erat leo. Sed sit amet nulla id sem consectetur auctor. Vivamus fringilla malesuada lectus, vel iaculis ligula faucibus id. Curabitur sed dui sed lacus dictum mattis. Aliquam tristique ligula vitae volutpat condimentum. Donec tincidunt pulvinar ipsum, id bibendum enim viverra vitae.'},
        {title:'Our contacts',
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed vestibulum mi, nec facilisis nisi. Sed hendrerit metus eget lorem ullamcorper ultrices. Nulla facilisi. Suspendisse potenti. Curabitur blandit eleifend purus, eget interdum velit. Phasellus elementum nunc a malesuada rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed dapibus, neque in fermentum efficitur, nisi mi pellentesque turpis, eu pretium turpis tellus in enim. In eu erat leo. Sed sit amet nulla id sem consectetur auctor. Vivamus fringilla malesuada lectus, vel iaculis ligula faucibus id. Curabitur sed dui sed lacus dictum mattis. Aliquam tristique ligula vitae volutpat condimentum. Donec tincidunt pulvinar ipsum, id bibendum enim viverra vitae.'},
        {title:'Github source',
        content:'As passionate authors, we firmly believe in the power of open code. We are thrilled to announce that we have made the bold decision to open our Git repository to the world, inviting fellow developers and enthusiasts to join us in this journey of collaborative creation. By embracing transparency and fostering a community of co-creators, we aim to cultivate an environment where ideas flourish and innovation knows no bounds. Together, let`s push the boundaries of what`s possible and shape the future of technology.'},
        {title:'Privacy policy',
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed vestibulum mi, nec facilisis nisi. Sed hendrerit metus eget lorem ullamcorper ultrices. Nulla facilisi. Suspendisse potenti. Curabitur blandit eleifend purus, eget interdum velit. Phasellus elementum nunc a malesuada rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed dapibus, neque in fermentum efficitur, nisi mi pellentesque turpis, eu pretium turpis tellus in enim. In eu erat leo. Sed sit amet nulla id sem consectetur auctor. Vivamus fringilla malesuada lectus, vel iaculis ligula faucibus id. Curabitur sed dui sed lacus dictum mattis. Aliquam tristique ligula vitae volutpat condimentum. Donec tincidunt pulvinar ipsum, id bibendum enim viverra vitae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed vestibulum mi, nec facilisis nisi. Sed hendrerit metus eget lorem ullamcorper ultrices. Nulla facilisi. Suspendisse potenti. Curabitur blandit eleifend purus, eget interdum velit. Phasellus elementum nunc a malesuada rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed dapibus, neque in fermentum efficitur, nisi mi pellentesque turpis, eu pretium turpis tellus in enim. In eu erat leo. Sed sit amet nulla id sem consectetur auctor. Vivamus fringilla malesuada lectus, vel iaculis ligula faucibus id. Curabitur sed dui sed lacus dictum mattis. Aliquam tristique ligula vitae volutpat condimentum. Donec tincidunt pulvinar ipsum, id bibendum enim viverra vitae.'}
    ];

    const features = [
        {icon:<FontAwesomeIcon icon={faChartLine} className="featureIcon"/>,
        title:'Seamless Trading Experience',
        content:'Experience hassle-free trading with CRPT.net. Our intuitive and user-friendly interface empowers you to execute trades swiftly and effortlessly. With real-time market data, you can stay updated on the latest price movements, order books, and trade volumes across multiple exchanges. Whether you are a beginner or an experienced trader, CRPT.net provides the perfect environment for seamless and secure trading.'},
        {icon:<FontAwesomeIcon icon={faDollarSign} className="featureIcon"/>,
        title:'Live Currency Data',
        content:'Stay ahead of the game with live currency data at your fingertips. CRPT.net delivers real-time updates on all major cryptocurrencies, ensuring you never miss a beat. Access comprehensive charts, price histories, and market insights to make informed trading decisions. Our advanced analytics tools provide deep insights into market trends, allowing you to identify lucrative opportunities and optimize your trading strategies.'},
        {icon:<FontAwesomeIcon icon={faExchangeAlt} className="featureIcon"/>,
        title:'Crypto Conversion Made Easy',
        content:'Need to convert your cryptocurrencies? Look no further than CRPT.net. Our platform supports seamless crypto conversions with a wide range of available trading pairs. Whether you want to swap Bitcoin for Ethereum or any other supported cryptocurrency, CRPT.net provides fast and reliable conversion options, all within a few clicks.'},
        {icon:<FontAwesomeIcon icon={faWallet} className="featureIcon"/>,
        title:'Wallet History and Management',
        content:'Take control of your crypto portfolio with CRPT.net wallet analysis and management tools. Connect your wallets to CRPT.net and gain a holistic view of your holdings. Track the performance of your investments, monitor balances, and receive valuable insights into your portfolio performance. Our robust analytics help you make data-driven decisions and optimize your investment strategies.'},
        {icon:<FontAwesomeIcon icon={faCoins} className="featureIcon"/>,
        title:'Explore and Discover',
        content:'Discover new cryptocurrencies and stay informed about the ever-expanding crypto market. CRPT.net offers a comprehensive list of all supported currencies, complete with detailed descriptions, historical data, and key metrics. Find your favorite cryptocurrencies and keep a close eye on their performance. CRPT.net ensures you never miss an opportunity to explore and invest in promising digital assets.'},
        {icon:<FontAwesomeIcon icon={faGift} className="featureIcon"/>,
        title:'Free Access to Crypto',
        content:'At CRPT.net, we believe in democratizing access to cryptocurrency services. That is why we offer a powerful range of features completely free of charge. You can enjoy all the benefits of CRPT.net trading platform, live currency data, crypto conversion, wallet analysis, and exploration of cryptocurrencies without any subscription fees or hidden costs. Our commitment to providing a free service ensures that everyone can participate in the exciting world of cryptocurrencies and take advantage of our cutting-edge tools and resources.'}
    ];

    const authors = [
        {icon:<FontAwesomeIcon icon={faUser} className="authorIcon"/>,
        name:'Maksymiuk Vladyslav',
        data:'Meet Vladyslav, a talented and ambitious full stack developer hailing from KNU in Kyiv, Ukraine. With a keen eye for design and a passion for coding, Vladyslav is a true visionary in the world of programming. His relentless pursuit of innovation drives him to create seamless user experiences and elegant solutions. Whether it is front-end development, back-end architecture, or database management, Vladyslav`s expertise spans the entire software development stack. With his dedication to staying on top of the latest technologies and his knack for turning ideas into reality, Vladyslav is poised to make a significant impact in the world of programming.',
        instagram:'https://www.instagram.com/vladislav_maksymiuk/',
        telegram:'https://t.me/vladislav_maksymiuk',
        github:'https://github.com/Lordofaliens',
        linkedin:'https://www.linkedin.com/in/vladyslav-maksymiuk-452a53253/'},
        {icon:<FontAwesomeIcon icon={faUser} className="authorIcon"/>,
        name:'Vasich Roman',
        data:'Say hello to Roman, a brilliant and creative full stack developer studying at KNU in Kyiv, Ukraine. With a natural talent for problem-solving, Roman thrives on finding unique solutions to complex coding challenges. His versatile skill set enables him to tackle both the front-end and back-end aspects of development with finesse. Roman`s meticulous attention to detail and his ability to think outside the box make him an invaluable asset to any project. Whether it is crafting intuitive user interfaces or optimizing server performance, his dedication and innovative thinking make him a true force to be reckoned with in the programming world.',
        instagram:'',
        telegram:'',
        github:'',
        linkedin:''}
    ];

    return {
        content,
        features,
        authors
    };
}

export default Model;
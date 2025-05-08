import React from 'react';


const Avatar = ({ url }) => {
    return <img src={url} alt="Avatar" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />;
};


export default Avatar;
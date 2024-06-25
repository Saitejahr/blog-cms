
import React from 'react';

import './styles/BlogData.css';

const Template2 = ({ title, content, image }) => {
  console.log(title, content, image);

  let imageUrl = '';

  // Check if image is a string and matches a valid URL format
  if (typeof image === 'string' && image.match(/\.(jpeg|jpg|gif|png)$/)) {
    imageUrl = `http://localhost:5001/${image.replace(/\\/g, '/')}`;
  } else if (image instanceof File) {
    
    imageUrl = URL.createObjectURL(image);
  }

  return (
    
    <div className='data-container'>
            {imageUrl && (
                <img className='data-image' src={imageUrl} alt="Uploaded"/>
            )}
          <h1 className='data-heading'>{title}</h1>
          <p className='data-para'>{content}</p>
          {imageUrl && (
          <img className='data-image' src={imageUrl} alt="Uploaded" />
          )}
          <h1 className='data-heading'>{title} </h1>
          <p className='data-para'>{content}</p>
        </div>
  );
};

export default Template2;
